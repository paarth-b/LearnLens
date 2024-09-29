'use client'

import { useFile } from '../app/FileContext';
import ReactPlayer from 'react-player';

export default function VideoPage() {
  const { file } = useFile();
  
  // Use the file here
  
  return (
    <p>{file}</p>
  );
}