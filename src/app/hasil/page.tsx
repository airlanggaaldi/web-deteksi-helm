"use client"
// import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Hasil() {

      const [image, setImage] = useState<string | null>(null);

      useEffect(() => {
            const storedImage = localStorage.getItem('image');
            setImage(storedImage);
      }, []);


      console.log(image)

      return (
            <div>
                  <h1>Test Hasil</h1>
                  {image ? <Image
                        src={image}
                        alt="Preview"
                        width={500}
                        height={500}
                        className="mx-auto w-auto h-96 object-cover rounded-md"
                  /> : <p> loading image ...</p>}
            </div>
      )
}
