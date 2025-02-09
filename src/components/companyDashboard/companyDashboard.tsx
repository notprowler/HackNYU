import React, { useState } from 'react'
import gucci from '../../../public/gucci.png'
// import { useSolanaProgram } from '../solanautils/solanautils'

function companyDashboard() {
  const [productId, setProductId] = useState('')
  const [nfcTagHash, setNfcTagHash] = useState('')
  // const { initializeProduct } = useSolanaProgram()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!productId || !nfcTagHash) {
      alert('Please fill out all fields')
      return
    }

    // await initializeProduct(productId, nfcTagHash)
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
        {/* <input
          type="text"
          className="w-10/12 px-4 py-2 border rounded-md "
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <input
          type="text"
          placeholder="NFC Tag Hash"
          className="w-10/12 px-4 py-2 border rounded-md "
          value={nfcTagHash}
          onChange={(e) => setNfcTagHash(e.target.value)}
        /> */}
        {/* <input type="text" placeholder="Product Name" className="w-10/12 px-4 py-2 border rounded-md " />

        <input type="text" placeholder="Product Description" className="w-10/12 px-4 py-2 border rounded-md " /> */}

        {/* <input type="text" placeholder="Product Price" className="w-10/12 px-4 py-2 border rounded-md " /> */}

        <button type="submit" className="btn btn-primary w-10/12">
          Add Product
        </button>
      </form>
    </div>
  )
}

export default companyDashboard
