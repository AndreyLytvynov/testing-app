"use client";

import Image from "next/image";
import React, { useState } from "react";

const FileUploader = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {selectedImage && (
        <Image
          src={selectedImage}
          alt='Selected Image'
          width={400}
          height={400}
        />
      )}

      <input
        id='image'
        onChange={handleImageChange}
        className='block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        type='file'
        name='image'
        required
      />
    </>
  );
};

export default FileUploader;
