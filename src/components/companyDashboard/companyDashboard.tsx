import React, { useState } from 'react'
import gucci from '../../../public/gucci.png'

function companyDashboard() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('Product Added')
  }
  return (
    <div className="flex w-screen items-center justify-center flex-col h-full">
      <img
        src={gucci} // Path relative to the public folder
        alt="Gucci Image"
        className="h-52 w-52 object-contain" // Optional: Tailwind styles to size the image
      />

      <h1 className="text-center font-bold text-lg">Add a new product </h1>
      <form onSubmit={handleSubmit} className="space-y-3 flex items-center flex-col w-6/12">
        <input type="text" placeholder="Product Name" className="w-10/12 px-4 py-2 border rounded-md " />

        <input type="text" placeholder="Product Description" className="w-10/12 px-4 py-2 border rounded-md " />

        <input type="text" placeholder="Product Price" className="w-10/12 px-4 py-2 border rounded-md " />

        <button type="submit" className="btn btn-primary w-10/12">
          Add Product
        </button>
      </form>
    </div>
  )
}

export default companyDashboard
