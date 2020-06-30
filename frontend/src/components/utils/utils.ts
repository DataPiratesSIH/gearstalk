import { MetaData } from "../../types";

export const stopwords = ['Blazer','Burkha','Chudidar','Long-pants','Saree','Bags','Kurta','Skirt','Strip-dress','Sunglasses','Trousers','shirt'];

export function captureVideoFrame(vid, format, quality) {
    if (typeof vid === "string") {
      vid = document.getElementById(vid);
    }

    format = format || "jpeg";
    quality = quality || 0.92;

    if (!vid || (format !== "png" && format !== "jpeg")) {
      return false;
    }

    const canvas = document.createElement("canvas");

    canvas.width = vid.videoWidth;
    canvas.height = vid.videoHeight;

    canvas.getContext("2d").drawImage(vid, 0, 0);

    let dataUri = canvas.toDataURL("image/" + format, quality);
    let data = dataUri.split(",")[1];
    let mimeType = dataUri.split(";")[0].slice(5);

    let bytes = window.atob(data);
    let buf = new ArrayBuffer(bytes.length);
    let arr = new Uint8Array(buf);

    for (let i = 0; i < bytes.length; i++) {
      arr[i] = bytes.charCodeAt(i);
    }

    let blob = new Blob([arr], { type: mimeType });
    return { blob: blob, dataUri: dataUri, format: format };
  }

  export const md:MetaData[] = [
    {
      frame_sec: 0,
      persons: [
        {
          box: [0, 0, 0.3, 0.3],
          labels: ["shirt"],
          colors: ["#fff222", "#fff222"],
        },
        {
          box: [0, 0, 0.3, 0.3],
          labels: ["shirt"],
          colors: ["#fff222", "#fff222"],
        },
      ],
    },
    {
      frame_sec: 0.5,
      persons: [
        {
          box: [0, 0, 0.3, 0.3],
          labels: ["shirt"],
          colors: ["#fff222", "#fff222"],
        },
        {
          box: [0, 0, 0.3, 0.3],
          labels: ["shirt"],
          colors: ["#fff222", "#fff222"],
        },
      ],
    },
    {
      frame_sec: 1,
      persons: [
        {
          box: [0, 0, 0.3, 0.3],
          labels: ["shirt"],
          colors: ["#fff222", "#fff222"],
        },
        {
          box: [0, 0, 0.3, 0.3],
          labels: ["shirt"],
          colors: ["#fff222", "#fff222"],
        },
      ],
    },
  ]