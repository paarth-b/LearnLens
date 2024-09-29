import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import "./file-input-style.css";

const fileTypes = ["PDF", "MP4"];

export default function FileInput( { setUploadFile } ) {
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
      setFile(file);
      setUploadFile(file);
    };
    return (
        <div>
            <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            />
        </div>
    );
  }