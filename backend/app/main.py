# main.py
from fastapi import FastAPI, BackgroundTasks
from fastapi.responses import FileResponse, JSONResponse
from .worker import get_file
from .classes import Video
import os
import shutil

app = FastAPI()


@app.post("/download/")
async def download(video: Video):
    result = await get_file(video.url)

    if not result.error:
        file_path = result.file_path
        title = result.title

        # funcion de limpieza
        async def cleanup():
            folder_path = os.path.dirname(file_path)
            if os.path.exists(folder_path):
                shutil.rmtree(folder_path)

        # funcin de limpieza en bg
        background_tasks = BackgroundTasks()
        background_tasks.add_task(cleanup)

        response = FileResponse(
            path=file_path,
            media_type="audio/mpeg",  # tipo MIME
            filename=f"{title}.mp3",  # nombre del archivo
            headers={"X-Video-Title": title},
            background=background_tasks,
        )

        return response
    else:
        return JSONResponse(
            status_code=400,
            content={
                "message": result.message,
            },
        )
