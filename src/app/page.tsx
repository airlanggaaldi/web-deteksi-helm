"use client";

import React, { useState } from "react";
import Image from 'next/image';
import { PhotoIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
// import { useRouter } from "next/router";
import { useRouter } from 'next/navigation';

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [foto, setFoto] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!foto) { throw console.log({ image: foto }) };
      const formData = new FormData();
      formData.append("image", foto);

      const response = await axios.post('http://localhost:5000/detect', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Server response:", response.data);

      if (response.status == 200) {
        const result = `http://localhost:5000${response.data.image}`;
        localStorage.setItem('image', result);
        router.push("/hasil")
      }
    } catch (err) {
      console.log("error frontend", err)
    }
  };

  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setFoto(file);
      }
      // reader.onload = () => setFormData({ image: preview as string });
      reader.readAsDataURL(file);

    } else {
      alert("Please select a valid image file (PNG, JPG, GIF)");
      setImage(null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="container text-center">
        <div className='text-center mt-5'>
          <h1 className='text-3xl font-semibold'>Deteksi Penggunaan Helm</h1>
        </div>
        <form onSubmit={handleSubmit} method="post">
          <div className={`mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 ${isDragging ? "border-indigo-500 bg-indigo-100" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}>
            <div>
              <div>
                {/* <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" /> */}
                {!image ? (
                  <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                ) : (
                  <div className="mb-1">
                    <Image
                      src={image}
                      alt="Preview"
                      width={500}
                      height={500}
                      className="mx-auto w-auto h-96 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              <div className="mt-4 flex text-sm/6 text-gray-600 justify-center">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="image"
                    type="file"
                    className="sr-only"
                    onChange={handleInputChange}
                    accept="image/png, image/jpeg, image/gif"
                  // value={formData.image}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs/5 text-gray-600">PNG or JPG photo</p>
            </div>
          </div>
          <div className="mt-2">
            <button className="btn btn-success w-52 font-mono font-semibold text-lg" type="submit">Detect</button>
          </div>
        </form>
      </div>
    </div>
  );
}
