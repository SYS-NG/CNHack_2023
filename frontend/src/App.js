import React, { useState } from "react";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [progress, setProgress] = useState(60); // Initial progress value

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from backend:", data);
        // Handle the response data here
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container">
      <div className="uploadBox">
        {previewImage && (
          <img src={previewImage} alt="Preview" className="previewImage" />
        )}

        <div className="centered">
          <input
            type="file"
            onChange={handleFileChange}
            className="fileInput"
          />
          <button onClick={handleUpload} className="uploadButton">
            Upload Image
          </button>
        </div>
      </div>

      <div className="data-output">
        {testData.map((item, idx) => (
          <Diagnosis
            key={idx}
            bgcolor={item.bgcolor}
            completed={item.completed}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
