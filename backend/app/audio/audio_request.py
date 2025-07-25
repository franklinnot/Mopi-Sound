from pydantic import BaseModel
from typing import Literal
from .audio_response import AudioResponse
from urllib.parse import urlparse
import re


class AudioRequest(BaseModel):
    url: str
    title: str | None = None
    quality: Literal["128" , "192" ,"256"] = "192"

    def verify_domain(self) -> AudioResponse:
        domains = [
            "youtube.com",
            "www.youtube.com",
            "youtu.be",
            "m.youtube.com",
            "soundcloud.com",
            "www.soundcloud.com",
            "m.soundcloud.com",
        ]

        audio_response = AudioResponse()
        try:
            parsed = urlparse(self.url)
            netloc = parsed.netloc.lower()
            invalid = True
            for domain in domains:
                if netloc.endswith(domain):
                    invalid = False
                    break
            audio_response.error = invalid
        finally:
            if audio_response.error:
                audio_response.message = (
                    "Solo se permiten enlaces de YouTube y SoundCloud."
                )
            return audio_response

    def verify_title(self) -> AudioResponse:
        audio_response = AudioResponse()
        invalid_chars = r'[<>:"/\\|?*\n\r\t]'

        if self.title is None or self.title.strip() == "":
            return audio_response
        elif re.search(invalid_chars, self.title):
            audio_response.error = True
            audio_response.message = "El título contiene caracteres no permitidos."
        elif len(self.title) > 48:
            audio_response.error = True
            audio_response.message = "El título es demasiado largo."

        return audio_response
