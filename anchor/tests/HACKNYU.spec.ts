import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {HACKNYU} from '../target/types/HACKNYU'

describe('HACKNYU', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.HACKNYU as Program<HACKNYU>

  const HACKNYUKeypair = Keypair.generate()

  it('Initialize HACKNYU', async () => {
    await program.methods
      .initialize()
      .accounts({
        HACKNYU: HACKNYUKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([HACKNYUKeypair])
      .rpc()

    const currentCount = await program.account.HACKNYU.fetch(HACKNYUKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment HACKNYU', async () => {
    await program.methods.increment().accounts({ HACKNYU: HACKNYUKeypair.publicKey }).rpc()

    const currentCount = await program.account.HACKNYU.fetch(HACKNYUKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment HACKNYU Again', async () => {
    await program.methods.increment().accounts({ HACKNYU: HACKNYUKeypair.publicKey }).rpc()

    const currentCount = await program.account.HACKNYU.fetch(HACKNYUKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement HACKNYU', async () => {
    await program.methods.decrement().accounts({ HACKNYU: HACKNYUKeypair.publicKey }).rpc()

    const currentCount = await program.account.HACKNYU.fetch(HACKNYUKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set HACKNYU value', async () => {
    await program.methods.set(42).accounts({ HACKNYU: HACKNYUKeypair.publicKey }).rpc()

    const currentCount = await program.account.HACKNYU.fetch(HACKNYUKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the HACKNYU account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        HACKNYU: HACKNYUKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.HACKNYU.fetchNullable(HACKNYUKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
