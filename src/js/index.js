// import { Environment, KeyPair, KinClient, KinAccount } from "@kinecosystem/kin-sdk-node";
// import "@babel/polyfill";


// const integEnv = new Environment({
// 	url: Environment.Testnet.url,
// 	passphrase: Environment.Testnet.passphrase,
// 	friendbotUrl: "https://friendbot.developers.kinecosystem.com",
// 	name: "test env"
// });

// const keypair = KeyPair.generate();

// const client = new KinClient(integEnv);

// async function f() {
//     const data = await client.getAccountData("GA24MXHLT3RY6QY7CEFI4O3GKC3ECBHKKIL44ZWMCKJMQGKPG2J72D6U");
//     console.log(data.balances[0].balance);
// }

// f();



$(function() {
	$('.kin-action').click(() => {
        $.ajax('http://34.238.253.210:8000/create', {
            type: 'POST',  // http method
            data: {"destination":"GDWDP63PRRJ5KC4PB7VKKXSKKB2CEYDKQTOF3ZTPUIY6RGLOKX6KJUYM","starting_balance":5,"memo":"berry"},  // data to submit
            success: function (data, status, xhr) {
                console.log(data);
            },
            error: function (jqXhr, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    });
});