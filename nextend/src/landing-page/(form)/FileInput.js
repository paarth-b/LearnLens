import React, { useRef } from 'react';

export function FileInput({ onFileUpload }) {
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            onFileUpload(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <button onClick={handleButtonClick}>Choose File</button>
        </div>
    );
}