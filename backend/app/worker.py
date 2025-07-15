from .dlp import get_audio, verify_duration
from .classes import InfoProcess
import os
import uuid
import asyncio


async def get_file(url: str) -> InfoProcess:
    folder = "downloads"
    os.makedirs(folder, exist_ok=True)

    folder_name = str(uuid.uuid4())  # nombre del folder
    folder_path = os.path.join(folder, folder_name)  # dentro de 'downloads'
    os.makedirs(folder_path, exist_ok=True)  # creamos

    info_process = await verify_duration(url)
    if info_process.error:
        return info_process

    return await get_audio(url, folder_path)


# Prueba
if __name__ == "__main__":
    asyncio.run(
        get_file("https://youtu.be/wdzNP7t3nZs?list=PLkcEwGUGBv8sQ2k8lNymrrxIWtSabntb8")
    )
