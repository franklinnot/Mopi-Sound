import axios from "axios";

export default async function getFramelyUrl(
  url: string
): Promise<string | null> {
  try {
    const api = `/api-iframely/api/try?url=${encodeURIComponent(url)}`;
    const response = await axios.get(api);

    const { code } = response.data;

    if (code) {
      // extraer la URL
      const match = code.match(
        /src="(https:\/\/w\.soundcloud\.com\/player\/[^"]+)"/
      );
      if (match && match[1]) {
        return match[1] + "&show_comments=false";
      }
    }
    return null;
  } catch {
    return null;
  }
}
