from fastapi import FastAPI, BackgroundTasks
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from .audio.audio_request import AudioRequest
from .audio.audio_response import AudioResponse
from .audio.audio_download import AudioDownload

app = FastAPI(title="Mopi-Sound", description="")

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"]
)

@app.post("/download-audio/")
async def download(audio_request: AudioRequest):
    audio_download = AudioDownload(**audio_request.model_dump())
    result: AudioResponse = await audio_download.extract()

    if result.error:
        return JSONResponse(status_code=406, content={"message": result.message})

    # agregar tarea de limpieza al background
    background_tasks = BackgroundTasks()
    background_tasks.add_task(audio_download.cleanup)

    response = FileResponse(
        path=audio_download.file_path,
        media_type="audio/mpeg",
        filename=f"{result.title}",
        headers={
            "message": result.message if result.message else "",
        },
        background=background_tasks,
    )

    return response
