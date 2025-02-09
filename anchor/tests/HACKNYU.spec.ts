import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {HACKNYU} from '../target/types/HACKNYU'
// import { ProductVerification } from "../target/types/product_verification";
import { expect } from "chai";

describe("product_verification", () => {
    const provider = anchor.AnchorProvider.local();
    anchor.setProvider(provider);
    const program = anchor.workspace.ProductVerification;

    it("Adds a product ID", async () => {
        const productAccount = anchor.web3.Keypair.generate();

        await program.methods.addProduct("12345")
            .accounts({
                product: productAccount.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .signers([productAccount])
            .rpc();

        const product = await program.account.product.fetch(productAccount.publicKey);
        expect(product.productId).to.equal("12345");
    });
});
