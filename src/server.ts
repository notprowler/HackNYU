import express from "express";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import bs58 from "bs58";

dotenv.config();
const app = express();
const PORT = 3000;
app.use(bodyParser.json());

// Load wallet keypair from .env
const secretKey = bs58.decode(process.env.PRIVATE_KEY || "");
const payer = Keypair.fromSecretKey(secretKey);

const PROGRAM_ID = new PublicKey("A1ypQVsivK192fyxighKTNKXRbbotQY2GxrbDNWkdasK"); 
const SOLANA_RPC_URL = "http://127.0.0.1:8899"; // Change to devnet for testing later on

const connection = new Connection(SOLANA_RPC_URL, "confirmed");
const provider = new AnchorProvider(connection, payer, { commitment: "confirmed" });

// Load  Anchor program
const idl = require("anchor/target/idl/HACKNYU.json"); // Save your IDL file here after running `anchor build`
const program = new Program(idl, PROGRAM_ID, provider);

/**
 * API to add a product (Only callable by program owner)
 */
app.post("/add_product", async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ error: "Missing product ID" });

    const productAccount = Keypair.generate();

    const tx = await program.methods
      .addProduct(productId)
      .accounts({
        product: productAccount.publicKey,
        user: payer.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([payer, productAccount])
      .rpc();

    res.json({ message: "Product added successfully!", tx });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * API to verify if a product exists
 */
app.get("/verify/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    // Fetch all accounts of type `Product`
    const accounts = await program.account.product.all();

    // Check if the product ID exists
    const exists = accounts.some((acc) => acc.account.productId === productId);

    res.json({ exists, message: exists ? "Product exists on the blockchain" : "Product not found" });
  } catch (error) {
    console.error("Error verifying product:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
