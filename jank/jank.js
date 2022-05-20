import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { assert } from "chai";
import { Test2 } from "../target/types/test2";

const { SystemProgram } = anchor.web3;

describe("Test-1", () => {

    // use a ocal provider
    const provider = anchor.AnchorProvider.env();

    // Configure the client to use the local cluster.
    anchor.setProvider(provider);

    // the program to execute 
    const program = anchor.workspace.Test2 as Program<Test2>;

    let _myAccount = null;

    it("Creates and initializes an account", async () => {

        // The Account to create.
        const myAccount = anchor.web3.Keypair.generate();

        await program.rpc.initialize({
            accounts: {
                myAccount: myAccount.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            },
            signers: [myAccount],
        });

        const account = await program.account.myAccount.fetch(myAccount.publicKey);

        // check its state was initialized
        assert.ok(account.data.eq(new anchor.BN(0)));

        _myAccount = myAccount;

    });

    it("Updates a previously created account", async () => {

        // The Account to create.
        const myAccount = _myAccount

        await program.rpc.update(new anchor.BN(100), {
            accounts: {
                myAccount: myAccount.publicKey,
            },
        });

        const account = await program.account.myAccount.fetch(myAccount.publicKey);

        // check its state was initialized
        assert.ok(account.data.eq(new anchor.BN(100)));

    });

    it("increment a previously created account", async () => {

        // The Account to create.
        const myAccount = _myAccount

        await program.rpc.increment({
            accounts: {
                myAccount: myAccount.publicKey,
            },
        });

        const account = await program.account.myAccount.fetch(myAccount.publicKey);

        // check its state was initialized
        assert.ok(account.data.eq(new anchor.BN(101)));

    });

    it("decrement a previously created account", async () => {

        // The Account to create.
        const myAccount = _myAccount

        await program.rpc.decrement({
            accounts: {
                myAccount: myAccount.publicKey,
            },
        });

        const account = await program.account.myAccount.fetch(myAccount.publicKey);

        // check its state was initialized
        assert.ok(account.data.eq(new anchor.BN(100)));

    });

});
