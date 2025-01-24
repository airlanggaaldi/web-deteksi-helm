"use client"
// import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState } from 'react';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link'
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
                  <div className='text-center mt-5 mb-5'>
                        <h2 className='text-3xl font-semibold'>Hasil Deteksi Penggunaan Helm</h2>
                  </div>
                  {image ? <Image
                        src={image}
                        alt="Preview"
                        width={500}
                        height={500}
                        className="mx-auto w-auto h-96 object-cover rounded-md"
                  /> : <p> loading image ...</p>}
                  <div className='mx-auto mt-5 flex items-center space-x-2 justify-center'>
                        <Link href="/" className='inline-flex items-center justify-center' >
                              <ArrowLeftCircleIcon className="size-5 text-gray-700" />
                              <div>Back</div>
                        </Link>
                  </div>
            </div>
      )
}
