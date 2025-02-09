#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod HACKNYU {
    use super::*;

  pub fn close(_ctx: Context<CloseHACKNYU>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.HACKNYU.count = ctx.accounts.HACKNYU.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.HACKNYU.count = ctx.accounts.HACKNYU.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeHACKNYU>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.HACKNYU.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeHACKNYU<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + HACKNYU::INIT_SPACE,
  payer = payer
  )]
  pub HACKNYU: Account<'info, HACKNYU>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseHACKNYU<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub HACKNYU: Account<'info, HACKNYU>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub HACKNYU: Account<'info, HACKNYU>,
}

#[account]
#[derive(InitSpace)]
pub struct HACKNYU {
  count: u8,
}
