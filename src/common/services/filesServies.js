import http from "./httpService";
import { apiUrl } from "../config.json";

/**
 * the function send request to the server to upload new file 
 * the function getting 1 parameter the
 * 1 the selected file
 * the function return the path to the upload file
 */
export function NewImgUpload(file) {
  http.post(`${apiUrl}/files/new-file`, file, {
    headers: {
      "Content-Type":
        "multipart/form-data; boundary=<calculated when request is sent>",
    },
  });
}
