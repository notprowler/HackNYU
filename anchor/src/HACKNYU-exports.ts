// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import HACKNYUIDL from '../target/idl/HACKNYU.json'
import type { HACKNYU } from '../target/types/HACKNYU'

// Re-export the generated IDL and type
export { HACKNYU, HACKNYUIDL }

// The programId is imported from the program IDL.
export const HACKNYU_PROGRAM_ID = new PublicKey(HACKNYUIDL.address)

// This is a helper function to get the HACKNYU Anchor program.
export function getHACKNYUProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...HACKNYUIDL, address: address ? address.toBase58() : HACKNYUIDL.address } as HACKNYU, provider)
}

// This is a helper function to get the program ID for the HACKNYU program depending on the cluster.
export function getHACKNYUProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the HACKNYU program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return HACKNYU_PROGRAM_ID
  }
}
