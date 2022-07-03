import axios from "axios";
import { useRef, useState } from "react";

// FIXME: API resolved without sending a response for /api/file, this may result in stalled requests.
function CustomizeFileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles([...(files || []), ...Array.from(e.target.files || [])]);
    e.target.value = ""; // 同じファイルを選択するのに必要
  };

  const selectFiles = () => {
    console.log(inputRef.current);
    inputRef.current?.click();
  };

  const resetFiles = () => {
    setFiles([]);
  };

  const sendFiles = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    const url = `/api/file`;
    const data = new FormData();
    files.forEach((file) => {
      data.append("file", file);
    });
    const headers = { "content-type": "multipart/form-data" };
    const res = await axios.post(url, data, { headers });
    console.log(res.status);
    console.log(JSON.stringify(res.data));
  };

  return (
    <div>
      <div>
        <table border={1}>
          <thead>
            <tr>
              <td>ファイル名</td>
              <td>タイプ</td>
              <td>ファイルサイズ</td>
              <td>最終更新時刻</td>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.name}>
                <td>{file.name}</td>
                <td>{file.type}</td>
                <td>{file.size}</td>
                <td>{file.lastModified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={selectFiles}>画像選択</button>
      <button onClick={resetFiles}>リセット</button>
      <input
        hidden
        ref={inputRef}
        type="file"
        onChange={onFileInputChange}
        multiple
      />
      <br />
      <button onClick={sendFiles}>送信！</button>
    </div>
  );
}

export default CustomizeFileUpload;
