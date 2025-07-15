from .classes import InfoProcess
from pathlib import Path
import yt_dlp
import os
import re
from unicodedata import normalize


def get_opts(outtmpl: str) -> dict:
    return {
        "format": "bestaudio/best",  # la mejor pista de audio
        "postprocessors": [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "256",  # bitrate recomendado
            }
        ],
        "outtmpl": outtmpl,  # template para el nombre y ubicacion
        "noplaylist": True,  # no descargar listas de reproduccion
        "quiet": True,  # no mostrar mensajes de progreso
        "no_warnings": True,  # no mostrar advertencias
    }


def get_info_opts() -> dict:
    return {
        "quiet": True,
        "no_warnings": True,
        "simulate": True,  # simular descarga
        "force_generic_extractor": True,  # metadatos generales
    }


def sanitize_name(filename: str) -> str:
    filename = normalize("NFKD", filename).encode("ascii", "ignore").decode("utf-8")
    filename = re.sub(r"[^\w\s.-]", "", filename)
    filename = re.sub(r"\s+", "-", filename)
    filename = filename.strip("-")
    if len(filename) > 100:
        filename = filename[:100]
    return filename


async def verify_duration(url: str) -> InfoProcess:
    MAX_DURATION_MINUTES = 4
    info_process = InfoProcess(
        error=True, message="No se pudo obtener alguna información del video."
    )
    try:
        with yt_dlp.YoutubeDL(get_info_opts()) as ydl:
            info = ydl.extract_info(url, download=False)

        if info is None:
            return info_process

        duration = info.get("duration")

        if duration is None:
            return info_process

        duration_minutes = duration / 60

        if duration_minutes > MAX_DURATION_MINUTES:
            return InfoProcess(
                error=True,
                message=f"La duración del video excede el límite de {MAX_DURATION_MINUTES} minutos.",
            )
        else:
            return InfoProcess(error=False)
    except:
        return info_process


async def get_audio(url: str, folder_path: str) -> InfoProcess:
    # crearemos el archivo dentro de la carpeta
    outtmpl = os.path.join(folder_path, "%(title)s.%(ext)s")

    try:
        with yt_dlp.YoutubeDL(get_opts(outtmpl)) as ydl:
            ydl.download([url])
    except:
        return InfoProcess(error=True, message="Error al descargar el audio del video.")

    info_process = InfoProcess()
    # verificar si se creo el archivo
    for filename in os.listdir(folder_path):
        if filename.endswith(".mp3"):
            info_process.file_path = Path(os.path.join(folder_path, filename))
            info_process.title = sanitize_name(os.path.splitext(filename)[0])
            break

    return info_process
