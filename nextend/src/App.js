'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import "./App.css";
import { useFile } from './app/FileContext';
import OpenPage from "./landing-page/OpenPage";

function App() {
  const { setFile } = useFile();
  const router = useRouter();

  function handleFileChange(upfile) {
    setFile(upfile);
    router.push('/video');
  }
  
  return (
    <div>
      <OpenPage getFileForNav={handleFileChange} />
    </div>
  );
}

export default App;