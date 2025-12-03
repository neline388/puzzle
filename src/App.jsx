import React, { useState } from "react";
import Puzzle from "./puzzle";

export default function App() {
  const [image, setImage] = useState(null);
  const [difficulty, setDifficulty] = useState(4);

  const onFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Photo Puzzle</h1>

      <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: 600 }}>
        <h5>Select or take a photo</h5>

        <label className="fw-bold mt-3">Choose from files</label>
        <input
          type="file"
          accept="image/*"
          className="form-control mt-1"
          onChange={onFileUpload}
        />

        <label className="fw-bold mt-4">Take a photo</label>
        <input
          type="file"
          accept="image/*"
          capture="environment" /*the rear */
          className="form-control mt-1"
          onChange={onFileUpload}
        />

        <div className="mt-4">
          <label className="fw-bold">Difficulty</label>
          <select
            className="form-select mt-1"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
          >
            <option value={3}>3 × 3 (Easy)</option>
            <option value={4}>4 × 4 (Medium)</option>
            <option value={5}>5 × 5 (Hard)</option>
          </select>
        </div>
      </div>

      {image && (
        <div className="mt-4">
          <Puzzle imageUrl={image} rows={difficulty} cols={difficulty} />
        </div>
      )}
    </div>
  );
}
