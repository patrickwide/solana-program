import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { assert } from "chai";
import { Test2 } from "../target/types/test2";

const { SystemProgram } = anchor.web3;

describe("Test2", () => {

    // use a ocal provider
    const provider = anchor.AnchorProvider.env();

    // Configure the client to use the local cluster.
    anchor.setProvider(provider);

    // the program to execute 
    const program = anchor.workspace.Test2 as Program<Test2>;

    let _myAccount = null;

    it("Create and initialize an account", async () => {

        // The Account to create.
        const myAccount = anchor.web3.Keypair.generate();

        await program.rpc.initialize("Hello world", {
            accounts: {
                myAccount: myAccount.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            },
            signers: [myAccount],
        });

        const account = await program.account.myAccount.fetch(myAccount.publicKey);

        // check its state was initialized
        assert.ok(account.data[0] === "Hello world");
        _myAccount = myAccount;

    });


    it("Add new data", async () => {

        // The Account to create.
        const myAccount = _myAccount

        await program.rpc.add("Some new data", {
            accounts: {
                myAccount: myAccount.publicKey,
            },
        });

        const account = await program.account.myAccount.fetch(myAccount.publicKey);

        // check its state was initialized
        assert.ok(account.data.length === 2);
    });

});
