import yt_dlp

URLS = ["https://youtu.be/wdzNP7t3nZs?list=PLkcEwGUGBv8sQ2k8lNymrrxIWtSabntb8"]


class MyLogger:
    def debug(self, msg):
        if msg.startswith("[debug] "):
            pass
        else:
            self.info(msg)

    def info(self, msg):
        pass

    def warning(self, msg):
        pass

    def error(self, msg):
        print(msg)


def my_hook(d):
    if d["status"] == "finished":
        print("Descarga finalizada, postprocesando...")
    elif d["status"] == "error":
        print("Hubo un error en la descarga...")


ydl_opts = {
    "logger": MyLogger(),
    "progress_hooks": [my_hook],
    "format": "bestaudio/best",  # la mejor pista de audio
    # extraer el audio y convertirlo a mp3
    "postprocessors": [
        {
            "key": "FFmpegExtractAudio",  # se usa ffmpeg
            "preferredcodec": "mp3",
            "preferredquality": "256",  # bitrate recomendado
        }
    ],
    # template para el nombre y ubicacion
    "outtmpl": "%(title)s.%(ext)s",
}

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    error_code = ydl.download(URLS)
