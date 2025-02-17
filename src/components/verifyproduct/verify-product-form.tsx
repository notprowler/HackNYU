// src/components/VerifyProductForm.tsx
import React, { useState } from 'react'

import { PublicKey } from '@solana/web3.js'
import { useSolanaProgram } from '../solanautils/solanautils'

const VerifyProductForm = () => {
  const [productPublicKey, setProductPublicKey] = useState('')
  const [nfcTagHash, setNfcTagHash] = useState('')
  const { verifyProduct } = useSolanaProgram()

  const handleVerifyProduct = async () => {
    if (!productPublicKey || !nfcTagHash) {
      alert('Please fill out all fields')
      return
    }
    await verifyProduct(new PublicKey(productPublicKey), nfcTagHash)
  }

  return (
    <div>
      <h2>Verify Product NFC Tag</h2>
      <input
        type="text"
        placeholder="Product Public Key"
        value={productPublicKey}
        onChange={(e) => setProductPublicKey(e.target.value)}
      />
      <input
        type="text"
        placeholder="NFC Tag Hash"
        value={nfcTagHash}
        onChange={(e) => setNfcTagHash(e.target.value)}
      />
      <button onClick={handleVerifyProduct}>Verify</button>
    </div>
  )
}

export default VerifyProductForm
