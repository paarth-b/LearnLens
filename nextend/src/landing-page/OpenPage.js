import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import FileInput from '../components/FileInput';
import "./open-page-style.css";
import ReactPlayer from 'react-player';
import { UploadForm } from './(form)/form';



export default function OpenPage( { getFileForNav } ) {
  const [upFile, setUpFile] = useState(''); 
  const [fileURL, setFileURL] = useState(null);

  const handleFile = (uFile) => {
    setUpFile(uFile);
    if (uFile) {
      setFileURL(URL.createObjectURL(uFile)); // Create an object URL for the file
      getFileForNav(uFile);
      // getFileURLForNav(URL.createObjectURL(uFile))
    }
    
  };
  
  return (
    <div className="outer-wrapper">
      <div id="typingAnimation" class="center-component">
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed once, initially
            'Learn about Trees',
            5000,
            'Learn about Graphs',
            5000,
            'Learn about Queues',
            5000,
          ]}
          speed={35}
          style={{ fontSize: '2em' }}
          repeat={Infinity}
        />
      </div>
      <div id="fileUpload" class="center-component">
        {/* <FileInput setUploadFile={handleFile} /> */}
        <UploadForm />
      </div>
    </div>
  );
}

