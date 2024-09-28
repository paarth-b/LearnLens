import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import "./file-input-style.css";

const fileTypes = ["PDF"];

export default function FileInput() {
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
      setFile(file);
    };
    return (
        <div>
            <FileUploader
            multiple={true}
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            />
            {/* <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p> */}
        </div>
    );
  }