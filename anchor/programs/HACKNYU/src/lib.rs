use anchor_lang::prelude::*;

// declare_id!("82jvBi1phYa5RMtFHifzXUJ4nKKFetn4VTHuPj7AnhG2");
declare_id!("A1ypQVsivK192fyxighKTNKXRbbotQY2GxrbDNWkdasK");

#[program]
pub mod product_verification {
    use super::*;

    // currently we arent checking if only owner can add a product
    pub fn add_product(ctx: Context<AddProduct>, product_id: String) -> Result<()> {
        let product = &mut ctx.accounts.product;
        product.product_id = product_id;
        Ok(())
    }

    pub fn verify_product(ctx: Context<VerifyProduct>, product_id: String) -> Result<bool> {
        let product = &ctx.accounts.product;
        Ok(product.product_id == product_id)
    }
}

#[derive(Accounts)]
pub struct AddProduct<'info> {
    #[account(init, payer = user, space = 64)]
    pub product: Account<'info, Product>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct VerifyProduct<'info> {
    pub product: Account<'info, Product>, 
}

#[account]
pub struct Product {
    pub product_id: String,
}
