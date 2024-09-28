import React, { useState } from 'react';
import "./App.css";

import OpenPage from "./landing-page/OpenPage";
import VideoPage from './video-display-page/VideoPage';
function App() {
  const [file, setFile] = useState(null);
  function handleFileChange (upfile) {
    setFile(upfile);

  }
  if (!file)
  {
    return (
      <div>
        <OpenPage getFileForNav = {handleFileChange} />  {/* Landing Page with FileUpload */}
      </div>
    );
  }
  else
  {
    return (
      <VideoPage vidFile={file} />
    );
  }
}

export default App;
