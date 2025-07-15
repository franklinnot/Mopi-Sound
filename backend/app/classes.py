from pydantic import BaseModel
import os

class InfoProcess(BaseModel):
    file_path: str | os.PathLike[str] = "/"
    title: str = "None"
    error: bool = False
    message: str = "None"


class Video(BaseModel):
    url: str
