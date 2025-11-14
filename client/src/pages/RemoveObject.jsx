import React, { useState } from 'react'
import { Sparkles, Eraser, Upload, Scissors } from 'lucide-react'

const RemoveObject = () => {
  const [objectName, setObjectName] = useState("");
  const [fileName, setFileName] = useState("");
  
  const onSubmitHandler = async (e) => {
    e.preventDefault()
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left col */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#447AFF]' />
          <h1 className='text-xl font-semibold'>Object Removal</h1>
        </div>
        
        <p className='mt-6 text-sm font-medium'>Upload Image</p>
        
        {/* File upload section */}
        <div className='mt-3 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center'>
          <input 
            type="file" 
            id="file-upload"
            className='hidden'
            accept="image/*"
            onChange={(e) => setFileName(e.target.files[0])}
          />
          <label htmlFor="file-upload" className='cursor-pointer'>
            <Upload className='w-8 h-8 text-gray-400 mx-auto mb-2' />
            <p className='text-sm text-gray-600'>
              <span className='text-blue-600 underline'>Choose File</span>
              {fileName ? ` ${fileName.name}` : ' No file chosen'}
            </p>
          </label>
        </div>

        {/* Object name input */}
        <p className='mt-6 text-sm font-medium'>Describe object name to remove</p>
        <textarea
        rows={4} 
          type="text" 
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' 
          placeholder='e.g., watch or spoon. Only single object name' 
          value={objectName}
          onChange={(e) => setObjectName(e.target.value)}
        />
        
        <button className='w-full flex justify-center items-center gap-2 bg-linear-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
          <Eraser className='w-5'/>
          Remove Object
        </button>
      </form>
      
      {/* Right col*/}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <Scissors className='w-5 h-5 text-[#447AFF]' />
          <h1 className='text-xl font-semibold'>Processed Image</h1>
        </div>
        
        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
            <Scissors className='w-9 h-9' />
            <p>Upload an image and click "Remove Object" to get started</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveObject