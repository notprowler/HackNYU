// src/components/ProductForm.tsx
import React, { useState } from 'react'
import { useSolanaProgram } from '../solanautils/solanautils'

const ProductForm = () => {
  const [productId, setProductId] = useState('')
  const [nfcTagHash, setNfcTagHash] = useState('')
  const { initializeProduct } = useSolanaProgram()

  const handleInitializeProduct = async () => {
    if (!productId || !nfcTagHash) {
      alert('Please fill out all fields')
      return
    }
    await initializeProduct(productId, nfcTagHash)
  }

  return (
    <div>
      <h2>Initialize Product</h2>
      <input type="text" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
      <input
        type="text"
        placeholder="NFC Tag Hash"
        value={nfcTagHash}
        onChange={(e) => setNfcTagHash(e.target.value)}
      />
      <button onClick={handleInitializeProduct}>Initialize</button>
    </div>
  )
}

export default ProductForm
