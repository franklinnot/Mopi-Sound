from pathlib import Path
from .audio_request import AudioRequest
from .audio_response import AudioResponse
import os
import uuid
import shutil
import yt_dlp


class AudioDownload(AudioRequest):
    folder_path: str | os.PathLike[str] = "/"
    folder_name: str | None = None
    file_path: str | os.PathLike[str] = "/"
    file_name: str | None = None
    error: bool = False
    message: str = "Hubo un error en la descarga."

    def get_info_opts(self) -> dict:
        return {
            "quiet": True,
            "no_warnings": True,
            "simulate": True,  # simular descarga
            "force_generic_extractor": True,  # metadatos generales
            "ie_key": "Generic"
        }

    def get_down_opts(self, outtmpl: str) -> dict:
        return {
            "format": "bestaudio/best",  # la mejor pista de audio
            "postprocessors": [
                {
                    "key": "FFmpegExtractAudio",
                    "preferredcodec": "mp3",
                    "preferredquality": self.quality,
                }
            ],
            "outtmpl": outtmpl,  # template para el nombre y ubicacion
            "noplaylist": True,  # no descargar listas de reproduccion
            "quiet": True,  # no mostrar mensajes de progreso
            "no_warnings": True,  # no mostrar advertencias
        }

    async def verify_duration(self, max_duration: int = 4) -> None:
        try:
            with yt_dlp.YoutubeDL(self.get_info_opts()) as ydl:
                info = ydl.extract_info(self.url, download=False)

            if info is None:
                raise

            duration = info.get("duration")

            if duration is None:
                raise

            if duration > max_duration * 60:
                self.error = True
                self.message = (
                    f"La duración del video excede el límite de {max_duration} minutos."
                )
            else:
                self.error = False
        except:
            self.error = True
            self.message = "No se pudo obtener información."

    async def setup(self) -> None:
        try:
            # creamos la carpeta  de descargas si no existe
            folder = "downloads"
            os.makedirs(folder, exist_ok=True)

            # creamos la carpeta que contendra el archivo de audio
            self.folder_name = str(uuid.uuid4())  # nombre unico
            # dentro de 'downloads'
            self.folder_path = os.path.join(folder, self.folder_name)
            os.makedirs(self.folder_path, exist_ok=True)  # creamos
        except:
            self.error = True

    async def download_dlp(self) -> None:
        try:
            # crearemos el archivo dentro de la carpeta
            outtmpl = os.path.join(self.folder_path, "%(title)s.%(ext)s")

            with yt_dlp.YoutubeDL(self.get_down_opts(outtmpl)) as ydl:
                ydl.download([self.url])

            # verificar si se creo el archivo
            for file in os.listdir(self.folder_path):
                if file.endswith(".mp3"):
                    self.file_path = Path(os.path.join(self.folder_path, file))
                    # self.title = sanitize_name(os.path.splitext(file)[0])
                    self.file_name = str(file)
                    break
        except:
            self.error = True

    async def cleanup(self) -> None:
        try:
            folder_path = os.path.dirname(self.file_path)
            if os.path.exists(folder_path):
                shutil.rmtree(folder_path)
        except:
            self.error = True

    async def extract(self) -> "AudioResponse":
        audio_response: AudioResponse = self.verify_domain()

        if audio_response.error:
            return audio_response

        audio_response = self.verify_title()

        if audio_response.error:
                    return audio_response

        await self.verify_duration()

        if not self.error:
            await self.setup()
            if not self.error:
                await self.download_dlp()
                if not self.error:
                    audio_response.title = self.title if self.title else self.file_name
                else:
                    await self.cleanup()
            else:
                await self.cleanup()

        if self.error:
            audio_response.message = self.message

        audio_response.error = self.error

        return audio_response
