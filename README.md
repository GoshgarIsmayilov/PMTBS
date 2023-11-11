# PMTBS

_Privacy-Preserving Multi-Token Bartering System_

Blockchain is an advanced distributed database that enables information to be securely and transparently stored and transmitted across the nodes of the network. By this time, it 
has been successfully integrated into many real-world applications. In recent years, bartering for the exchange of tokenized assets  on blockchains has been been receiving attention.
In this paper, we have addressed the privacy-preserving ascending auction-based multi-token bartering problem on blockchain where the user balances and user bids are private. For the
given problem, we have proposed the _PMTBS_ protocol (i.e. Privacy-preserving Multi-Token Bartering System) utilizing commitments, asymmetric encryptions and zero-knowledge proofs.
The protocol supports both privacy-preserving multi-token transfer through \textit{depositing token} and \textit{withdrawing token} stages; and privacy-preserving multi-token 
bartering through \textit{(re)proposing bid}, \textit{submitting bid aggregation}, \textit{verifying bid aggregation} and \textit{bartering token} stages. The protocol is analyzed 
based on the security and scalability perspectives including the computational, communicational and storage overheads. For the experimental study, the performance of the protocol 
is measured based on the blockchain gas costs and the zero-knowledge proof generation and verification times. 

# To Run

The Metamask extension must be installed on the browser and the node-js extension must be also installed in order to run the server.js file.

In the directory of server.js file, execute ```node server.js``` in order to run the local server.

Execute ```http://localhost:3300/``` on the browser where Metamask prompts you to connect on your Ethereum account.

Steps to make a private transaction:

1. Deploy a new instance of the Multi-Token contract.
2. Sender gets consent from receiver.
3. Receiver gives consent to sender.
4. Sender deposits multi-tokens to the smart contract by generating corresponding zero-knowledge depositing proof.
5. Receiver withdraws multi-tokens from the smart contract by generating corresponding zero-knowledge withdrawing proof.

Steps to make a private bartering:

1. Deploy a new instance of the Barter contract.
2. Propose bid by subtracting the multi-tokens to be given from the balance in the Multi-Token contract by generating corresponding proposing proof.
3. Submit the bid aggregation at every stage to the peer addresses in the hypercube networks.
4. Aggregate the bid aggregations recursively until the final bid aggregation in reached by generating corresponding aggregating proof.
5. If the final bid aggregation is a solution for bartering, barter the multi-tokens by adding the multi-tokens to be requsted to the balance in the Multi-Token contract by generating corresponding bartering proof.
6. If the final bid aggregation is not a solution for bartering, go back to step 3 to repropose the bid by increasing the multi-tokens to be given and decreasing the multi-tokens to be requested by generating corresponding reproposal proof.

<img src="https://github.com/GoshgarIsmayilov/PMTBS/blob/main/Auxiliary/Screenshots/barter_main.png" width="60%"/> 

<img src="https://github.com/GoshgarIsmayilov/PMTBS/blob/main/Auxiliary/Screenshots/example.png" width="60%"/> 

# To Run Local Blockchain Test

There are two javascript files to simulate privacy-preserving multi-token transferring and bartering.

The node libraries including web3, eccrypto-js and zokrates-js must be installed beforehand.

Execute ```geth --http --http.corsdomain="https://remix.ethereum.org" --http.api web3,eth,debug,personal,net,ethers --vmdebug --dev console --allow-insecure-unlock``` to run a local blockchain.

Deploy an instance of the contracts by selecting ```External HTTP Provider```.

Run the script ```node script_transfer.js``` for privacy-preserving transferring and ```node script_barter.js``` for privacy-preserving bartering.

# Experimental Study 

## Blockchain Gas Consumption 
 
| Function                     | Gas Units        | Gas Cost (Avax)  | Gas Cost (USD)  |
| ---------------------------- | ---------------- | ---------------- | --------------- |
| Deploy Multi-Token Contract  | 3,172,699        | 0.087249         | 1.99            |
| Deploy Barter Contract       | 5,197,558        | 0.142932         | 3.26            |
| Deposit Multi-Tokens         | 1,683,626        | 0.044616         | 1.02            |
| Withdraw Multi-Tokens        | 1,300,382        | 0.034460         | 0.79            |
| Propose Bid                  | 1,724,275        | 0.045693         | 1.04            |
| Submit Bid Aggregation       | 941,585          | 0.024952         | 0.57            |
| Verify Bid Aggregation       | 1,624,108        | 0.043038         | 0.98            |
| Repropose Bid                | 1,449,488        | 0.038411         | 0.88            |
| Barter Multi-Tokens          | 1,442,438        | 0.038224         | 0.87            |

The transaction hashes can be traced on ```https://testnet.snowtrace.io```:

Multi-Token Contract: 0xc421563f840DD1f7aDD4650FB17Cd6230e3c0551

1. Get Consent:

   0xfd40abc9eb994cafbfa84b72d02a1d55a77cf0eb7e1b4245eb4f4553cf98d0cf

2. Give Consent:

   0x87a7aad854aee4db625eaa7d2a78fc13dc676446dc2c7a34af970af045d67eca

3. Deposit Multi-Tokens:

   0x16fa368d8d1f006595cf4c05c8b8850264ddb2a43426dae9da255e82f58c8283
   
3. Withdraw Multi-Tokens:

   0xad1a0a6d37dbd2b0b43ff03dfcdd0862e9e586e317c17c2316c8ab30ee695623

Barter Contract: 0xEe6DaA402ac81Ac0F74Ce6F0A6A9dEeF54D13152

1. Propose Bid:

   0x1fed1f8faf9d77974a85ebd7333eaae3b193f10dbe875af62b4b7ec965dda168
   0xae9bf3439f70d89565056f5fe6a0d43f2be6e03fdf8d66654a1240cccdfc88e7

2. Submit Bid Aggregation:

   0x9590c59fa0e029bbe98779f89a988010f178d2deb29a2376f4089bd3c9b1a7d0
   0x414253c957276dbffd7b12a489e0c24732afc20e558de0c3adb33696c6f92dfd

3. Verify Bid Aggregation:

   0xe0ac219675eb0b4524b606372a8518a11112f252b47c4c94a2597a85cff96789
   0xb15d9d01cd3002585fd547e804170c583a2d11b8d795f049748c975333366ed2

4. Repropose Bid:

   0x916482d4c5ffe5563713d3093c7ee6a3e3a859d30c3c209f43010c759c5d6fd7
   0x27d597a0bb42d511fab883d49a5dc348ea4213d32ae3f2c55ab1cfeb0dc67223

5. Submit Bid Aggregation:

   0xe148bb09dfcebd0b07f00c28f3b91a733e1d4f04897cde143ced54d3597000ef
   0x7da3fac8dd21781440542cf435f4b0bf194bfa9a35ff598f4cfa2a64f068ca6b

6. Verify Bid Aggregation:   

   0x57ccd9732c18e51217d56e1c30a4fc10d6144d676665eccbc5ac6d18dedcfee7
   0x44c54816703b7ad2a92038571714399cec2b820dd431a89f457482b031366401

7. Barter Multi-Tokens

   0x9e48195c77ee224aded3b94b39d9e65cb8b84734efa346374dbd534dba82335c
   0x8e2e2739ab4317a72623c61c317124dce4f813c4b3f6a36ffe591fe51a40adfb

## Zero-Knowledge Proof Generation/Verification Times

| Run             | Generation Time (sec)  | 
| --------------- | ---------------------- | 
| 0               | 95.812                 |   
| 1               | 91.022                 |  
| 2               | 87.475                 |  
| 3               | 91.622                 |  
| 4               | 87.333                 |  
| 5               | 88.207                 |  
| 6               | 87.289                 |  
| 7               | 87.485                 |  
| 8               | 87.274                 |  
| 9               | 87.433                 |  
| 10              | 87.292                 |  
| 11              | 89.328                 |  
| 12              | 87.522                 |  
| 13              | 87.167                 |  
| 14              | 87.429                 |  
| 15              | 87.342                 |  
| 16              | 87.302                 |  
| 17              | 87.234                 |  
| 18              | 87.180                 |  
| 19              | 87.252                 |  

The zero-knowledge proofs are verified on-chain, without requiring any time cost. Note that the outliers are excluded in the figure.

ZKP Times for Depositing...   ZKP Times for Withdrawing...    

<img src="https://github.com/GoshgarIsmayilov/PMTBS/blob/main/Auxiliary/Screenshots/zkp_times_deposit.png" width="30%"/> <img src="https://github.com/GoshgarIsmayilov/PMTBS/blob/main/Auxiliary/Screenshots/zkp_times_withdraw.png" width="30%"/>  

ZKP Times for Aggregation...   ZKP Times for Barter...   ZKP Times for Reproposal...  

<img src="https://github.com/GoshgarIsmayilov/PMTBS/blob/main/Auxiliary/Screenshots/zkp_times_aggregation.png" width="30%"/> <img src="https://github.com/GoshgarIsmayilov/PMTBS/blob/main/Auxiliary/Screenshots/zkp_times_barter.png" width="32%"/> <img src="https://github.com/GoshgarIsmayilov/PMTBS/blob/main/Auxiliary/Screenshots/zkp_times_reproposal.png" width="31%"/>  

# Web User Interface

Deploy Multi-Token Contract...   Get Consent...   Give Consent...  

<img src="https://github.com/GoshgarIsmayilov/PMTBS/blob/main/Auxiliary/Screenshots/deploy_multi_token.png" width="32%"/> <img src="https://github.com/GoshgarIsmayilov/PMTBS/blob/main/Auxiliary/Screenshots/get_consent.png" width="32%"/> <img src="https://github.com/GoshgarIsmayilov/PMTBS/blob/main/Auxiliary/Screenshots/give_consent.png" width="32%"/>  

Deposit Multi-Tokens...   Withdraw Multi-Tokens

<img src="https://github.com/GoshgarIsmayilov/PMTBS/blob/main/Auxiliary/Screenshots/deposit_tokens.png" width="32%"/> <img src="https://github.com/GoshgarIsmayilov/PMTBS/blob/main/Auxiliary/Screenshots/withdraw_tokens.png" width="32%"/>  

Deploy Barter Contract...   Propose Bid...   Repropose Bid...   

<img src="https://github.com/GoshgarIsmayilov/PMTBS/blob/main/Auxiliary/Screenshots/deploy_barter.png" width="37%"/> <img src="https://github.com/GoshgarIsmayilov/PMTBS/blob/main/Auxiliary/Screenshots/propose_bid.png" width="34%"/> <img src="https://github.com/GoshgarIsmayilov/PMTBS/blob/main/Auxiliary/Screenshots/repropose_bid.png" width="25%"/>  

Submit Bid Aggregation...   Verify Bid Aggregation...    Barter Bid...   

<img src="https://github.com/GoshgarIsmayilov/PMTBS/blob/main/Auxiliary/Screenshots/submit_bid_aggregation.png" width="37%"/> <img src="https://github.com/GoshgarIsmayilov/PMTBS/blob/main/Auxiliary/Screenshots/verify_bid_aggregation.png" width="32%"/> <img src="https://github.com/GoshgarIsmayilov/PMTBS/blob/main/Auxiliary/Screenshots/barter_tokens.png" width="25%"/>  


# Disclaimer

This software is made available for educational purposes only.
