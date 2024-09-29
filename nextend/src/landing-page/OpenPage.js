import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import FileInput from './FileInput';
import "./open-page-style.css";
import ReactPlayer from 'react-player';



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
        <FileInput setUploadFile={handleFile} />
      </div>
      <div id="pdfView" class="center-component">
      {/* <div id={`pdf-viewer ${upFile ? 'pdf-viewer-visible' : 'pdf-viewer-hidden'}`} class="center-component"> */}

        {/* {upFile && (
            <div>
              <p>File Name: {upFile.name}</p>
              {fileURL && (
                <div className="pdf-viewer">
                  <iframe
                    src={fileURL}
                    title="PDF Viewer"
                    width="50%"
                    height="700px"
                  />
                </div>
              )}
            </div>
          )} */}
          <ReactPlayer controls url={fileURL} />
        
      </div>
    </div>
  );
}

