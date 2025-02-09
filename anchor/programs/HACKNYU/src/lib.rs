#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod hack_nyu {
    use super::*;

    pub fn initialize_product(
        ctx: Context<InitializeProduct>,
        product_id: String,
        nfc_tag_hash: String,
    ) -> Result<()> {
        let product = &mut ctx.accounts.product;
        product.product_id = product_id;
        product.nfc_tag_hash = nfc_tag_hash;
        product.business = *ctx.accounts.business.key;

        Ok(())
    }

    pub fn update_product(
        ctx: Context<UpdateProduct>,
        new_nfc_tag_hash: String,
    ) -> Result<()> {
        require!(
            ctx.accounts.business.key() == ctx.accounts.product.business,
            ErrorCode::Unauthorized
        );

        let product = &mut ctx.accounts.product;
        product.nfc_tag_hash = new_nfc_tag_hash;
        Ok(())
    }

    pub fn delete_product(ctx: Context<DeleteProduct>) -> Result<()> {
        require!(
            ctx.accounts.business.key() == ctx.accounts.product.business,
            ErrorCode::Unauthorized
        );

        Ok(())
    }
    pub fn verify_product(ctx: Context<VerifyProduct>, nfc_tag_hash: String) -> Result<()> {
      let product = &ctx.accounts.product;
      if product.nfc_tag_hash == nfc_tag_hash {
          msg!("Product verification successful");
      } else {
          msg!("Product verification failed");
      }
      Ok(())
  }  
}

#[derive(Accounts)]
pub struct InitializeProduct<'info> {
    #[account(mut)]
    pub business: Signer<'info>,

    #[account(
        init,
        space = 8 + Product::INIT_SPACE,
        payer = business
    )]
    pub product: Account<'info, Product>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateProduct<'info> {
    #[account(mut)]
    pub business: Signer<'info>,

    #[account(mut)]
    pub product: Account<'info, Product>,
}

#[derive(Accounts)]
pub struct DeleteProduct<'info> {
    #[account(mut)]
    pub business: Signer<'info>,

    #[account(
        mut,
        close = business
    )]
    pub product: Account<'info, Product>,
}

#[derive(Accounts)]
pub struct VerifyProduct<'info> {
    pub product: Account<'info, Product>,
}

#[account]
#[derive(InitSpace)]
pub struct Product {
    #[max_len(64)] // Fix for "Expected max_len attribute"
    pub product_id: String,  

    #[max_len(128)] // Fix for "Expected max_len attribute"
    pub nfc_tag_hash: String,

    pub business: Pubkey,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Unauthorized: You are not the owner of this product.")]
    Unauthorized,
}

