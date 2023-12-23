import React, { useState } from "react";

const ImageUploader = ({ register }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-2 mb-4">
      <input
        type="file"
        accept="image/*"
        {...register("imagen", { required: false })}
        onChange={(e) => handleImageChange(e)}
      />
      {previewImage && (
        <div>
          <span className="mt-10 font-bold flex justify-center text-lg">
            Previsualizacion
          </span>
          <div className="mt-4 border-2 rounded-lg border-blue-200">
            {previewImage && (
              <img className="mt-2" src={previewImage} alt="Preview" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
