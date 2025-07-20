from pydantic import BaseModel
from .quality import Quality
from .audio_response import AudioResponse
from urllib.parse import urlparse


class AudioRequest(BaseModel):
    url: str
    quality: Quality = Quality.MEDIUM

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
