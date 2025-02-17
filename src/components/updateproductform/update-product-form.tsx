// src/components/UpdateProductForm.tsx
import React, { useState } from 'react'

import { PublicKey } from '@solana/web3.js'
import { useSolanaProgram } from '../solanautils/solanautils'

const UpdateProductForm = () => {
  const [productPublicKey, setProductPublicKey] = useState('')
  const [newNfcTagHash, setNewNfcTagHash] = useState('')
  const { updateProduct } = useSolanaProgram()

  const handleUpdateProduct = async () => {
    if (!productPublicKey || !newNfcTagHash) {
      alert('Please fill out all fields')
      return
    }
    await updateProduct(new PublicKey(productPublicKey), newNfcTagHash)
  }

  return (
    <div>
      <h2>Update Product NFC Tag</h2>
      <input
        type="text"
        placeholder="Product Public Key"
        value={productPublicKey}
        onChange={(e) => setProductPublicKey(e.target.value)}
      />
      <input
        type="text"
        placeholder="New NFC Tag Hash"
        value={newNfcTagHash}
        onChange={(e) => setNewNfcTagHash(e.target.value)}
      />
      <button onClick={handleUpdateProduct}>Update</button>
    </div>
  )
}

export default UpdateProductForm
