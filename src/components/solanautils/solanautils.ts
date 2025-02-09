// src/solanaUtils.ts
import { Program, web3 } from '@project-serum/anchor'
import { useAnchorProvider } from './components/SolanaProvider'
import { PublicKey } from '@solana/web3.js'

// Import your IDL
import idl from './idl/hack_nyu.json'

const programId = new PublicKey("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF")

export const useSolanaProgram = () => {
  const anchorProvider = useAnchorProvider()
  const program = new Program(idl, programId, anchorProvider)

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
