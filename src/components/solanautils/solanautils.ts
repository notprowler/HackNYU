// src/solanaUtils.ts
import { PublicKey } from '@solana/web3.js'
import { web3 } from '@coral-xyz/anchor'
import { HACKNYUIDL, getHACKNYUProgram, HackNyu } from "../../../anchor/src/HACKNYU-exports"
import { useAnchorProvider } from '../solana/solana-provider'

const programId = new PublicKey("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF")

export const useSolanaProgram = () => {
  const anchorProvider = useAnchorProvider()
  const program = getHACKNYUProgram(anchorProvider, programId)

  // Initialize Product
  const initializeProduct = async (productId: string, nfcTagHash: string) => {
    try {
      const tx = await program.rpc.initializeProduct(productId, nfcTagHash, {
        accounts: {
          product: new PublicKey('productPublicKeyHere'), // Specify the product public key here
          business: anchorProvider.wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        },
      })
      console.log('Transaction successful:', tx)
    } catch (error) {
      console.error('Transaction failed:', error)
    }
  }

  // Update Product NFC Tag
  const updateProduct = async (productPublicKey: PublicKey, newNfcTagHash: string) => {
    try {
      const tx = await program.rpc.updateProduct(newNfcTagHash, {
        accounts: {
          product: productPublicKey,
          business: anchorProvider.wallet.publicKey,
        },
      })
      console.log('Transaction successful:', tx)
    } catch (error) {
      console.error('Transaction failed:', error)
    }
  }

  // Verify Product
  const verifyProduct = async (productPublicKey: PublicKey, nfcTagHash: string) => {
    try {
      const tx = await program.rpc.verifyProduct(nfcTagHash, {
        accounts: {
          product: productPublicKey,
        },
      })
      console.log('Verification successful:', tx)
    } catch (error) {
      console.error('Verification failed:', error)
    }
  }

  return { initializeProduct, updateProduct, verifyProduct }
}
