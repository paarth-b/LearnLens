// app/FileContext.js
'use client'

import React, { createContext, useState, useContext } from 'react';

const FileContext = createContext();

export function FileProvider({ children }) {
  const [file, setFile] = useState(null);
  return (
    <FileContext.Provider value={{ file, setFile }}>
      {children}
    </FileContext.Provider>
  );
}

export function useFile() {
  return useContext(FileContext);
}