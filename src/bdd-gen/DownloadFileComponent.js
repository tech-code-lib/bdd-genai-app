import React from 'react';
import { saveAs } from 'file-saver';

const DownloadFileComponent = ({strData, disabled}) => {
  const handleDownload = () => {
    // Data to be saved in the file
    const data = new Blob([strData], { type: 'text/plain;charset=utf-8' });
    // File name
    const filename = 'data.feature';
    // Save the file
    saveAs(data, filename);
  };

  return (
    <div>
      <button className="btn btn-secondary mt-3" disabled={disabled} onClick={handleDownload}>Download File</button>
      <button className="btn" disabled={disabled} onClick={() => {navigator.clipboard.writeText(strData);alert('Copied')}}><i className="fas fa-copy" style={{fontSize:23}}></i></button>
    </div>
  );
};

export default DownloadFileComponent;
