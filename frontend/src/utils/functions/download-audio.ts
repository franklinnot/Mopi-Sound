import createFile from "./create-file";

const BACKEND_URL = "http://localhost:8000";

export async function downloadAudio(
  url: string,
  title: string | null,
  quality: string
): Promise<string | null> {
  if (!url) {
    return "Ingresa el link de la canción";
  }

  try {
    const response = await fetch(`${BACKEND_URL}/download-audio/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
        title: title,
        quality: quality,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return error.message;
    }

    if (!(await createFile(response))) {
      return "Hubo un error en la descarga";
    }

    return null;
  } catch {
    return "Hubo un error en la descarga";
  }
}
