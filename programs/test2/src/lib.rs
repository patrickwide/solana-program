use anchor_lang::prelude::*;

declare_id!("4oKsYNVgazbSYaFqwZM4bXxbs3Fw7Ciq2StWkxqFDHEU");

#[program]
mod test2 {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>,data: String) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        let copy = data.clone();
        my_account.data.push(copy.to_string());
        Ok(())
    }

    pub fn add(ctx: Context<Add>, data: String) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        let copy = data.clone();
        my_account.data.push(copy.to_string());
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 64 + 64)]
    pub my_account: Account<'info, MyAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Add<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}

#[account]
pub struct MyAccount {
    pub data:  Vec<String>,
}
