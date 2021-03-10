import http from "./httpService";
import { apiUrl } from "../config.json";

export function NewImgUpload(file) {
  http.post(`${apiUrl}/files/new-file`, file, {
    headers: {
      "Content-Type":
        "multipart/form-data; boundary=<calculated when request is sent>",
    },
  });
}
