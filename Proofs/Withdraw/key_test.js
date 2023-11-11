const { initialize } = require('zokrates-js')
const fs = require('fs');

function generate_sender_proof(a, b, c, d, e, f){
    initialize().then((zokratesProvider) => {
        const source = 'import "hashes/sha256/512bit" as sha256;\n\
                        import "utils/pack/u32/pack256" as pack256;\n\
                        def main(private u32[8] mut balance, private u32[8] withdraw, private u32 balanceSalt, public field balanceCommitment, public field withdrawCommitment, public field nextBalanceCommitment) -> field {\n\
                            u32[8] computedBalanceCommitmentUnpacked = sha256(balance[0..8], balance[0..8]);\n\
                            field computedBalanceCommitment = pack256(computedBalanceCommitmentUnpacked);\n\
                            u32[8] computedWithdrawCommitmentUnpacked = sha256(withdraw[0..8], withdraw[0..8]);\n\
                            field computedWithdrawCommitment = pack256(computedWithdrawCommitmentUnpacked);\n\
                            for u32 i in 0..7 {\n\
                                balance[i] = balance[i] + withdraw[i];\n\
                            }\n\
                            balance[7] = balanceSalt;\n\
                            u32[8] computedNextBalanceCommitmentUnpacked = sha256(balance[0..8], balance[0..8]);\n\
                            field computedNextBalanceCommitment = pack256(computedNextBalanceCommitmentUnpacked);\n\
                            field result = (computedBalanceCommitment == balanceCommitment && computedWithdrawCommitment == withdrawCommitment && computedNextBalanceCommitment == nextBalanceCommitment) ? 1 : 0;\n\
                            return result;\n\
                        }'

        const artifacts = zokratesProvider.compile(source);
    
        const { witness, output } = zokratesProvider.computeWitness(artifacts, [a, b, c, d, e, f]);

        //var pkStr = "";

        // const pkRestored = new Uint8Array(Buffer.from(pkStr, 'base64')); 
        
        const keypair = zokratesProvider.setup(artifacts.program);
    
        const proof = zokratesProvider.generateProof(artifacts.program, witness, keypair.pk);

        console.log(proof.proof.a);
        console.log(proof.proof.b);
        console.log(proof.proof.c); 
        console.log(proof.inputs);
    
        const verifier = zokratesProvider.exportSolidityVerifier(keypair.vk);
        const isVerified = zokratesProvider.verify(keypair.vk, proof);

        var pkStr = Buffer.from(keypair.pk).toString('base64');
        console.log(pkStr);
        console.log(keypair.vk);
        console.log(verifier); 
    });
} 

balance = ["9","9","9","9","9","9","9","0"]
deposit = ["1","1","1","1","1","1","1","0"]
balanceSalt = "123";
balance_commitment = "4457204857603953141004973226832048925767341563131343455083070231881660342476" 
deposit_commitment = "8627118554770264612364788685127028490438563068465239045288132929770309574892"
next_balance_commitment = "7087749880087191162465444895762015094817036496986744707738380026888487615859"

generate_sender_proof(balance, deposit, balanceSalt, balance_commitment, deposit_commitment, next_balance_commitment)  



