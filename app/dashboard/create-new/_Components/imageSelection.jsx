"use client"
import React from 'react'
import Image from 'next/image'

function ImageSelection( {selectedImage}) {
    const [file, setfile] = React.useState(null)
  const onFileSelected=(event)=>{
    console.log(event.target.files[0])
    setfile(event.target.files[0])
    selectedImage(event.target.files[0])

    }
  return (
    <div>
      <label>Select Image of your room </label>
      <div className='mt-3 '>
        <label htmlFor='upload-image'>
            <div className={`p-28 border rounded-xl border-dotted flex justify-center border-purple-600 bg-slate-200 cursor-pointer hover:shadow-lg ${file&&'p-0 bg-white'}`}>
             {!file? <Image alt='upload image' src={'/imageupload.png'} width={70} height={70} />:<Image  alt='image' src={URL.createObjectURL(file)} width={300} height={300} className='w-[300px] h-[300px] object-cover'/>}
            </div>
        </label>
        <input type='file' accept='image/*' id='upload-image' style={{display:'none'}}
            onChange={onFileSelected}
        />
      </div>
    </div>
  )
}

export default ImageSelection
