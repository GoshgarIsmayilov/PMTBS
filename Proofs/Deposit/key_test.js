const { initialize } = require('zokrates-js')
const fs = require('fs');

function generate_sender_proof(a, b, c, d, e, f){
    initialize().then((zokratesProvider) => {
        const source = 'import "hashes/sha256/512bit" as sha256;\n\
                        import "utils/pack/u32/pack256" as pack256;\n\
                        def main(private u32[8] mut balance, private u32[8] deposit, private u32 balanceSalt, public field balanceCommitment, public field depositCommitment, public field nextBalanceCommitment) -> field {\n\
                            u32[8] computedBalanceCommitmentUnpacked = sha256(balance[0..8], balance[0..8]);\n\
                            field computedBalanceCommitment = pack256(computedBalanceCommitmentUnpacked);\n\
                            u32[8] computedDepositCommitmentUnpacked = sha256(deposit[0..8], deposit[0..8]);\n\
                            field computedDepositCommitment = pack256(computedDepositCommitmentUnpacked);\n\
                            for u32 i in 0..7 {\n\
                                balance[i] = balance[i] - deposit[i];\n\
                            }\n\
                            balance[7] = balanceSalt;\n\
                            u32[8] computedNextBalanceCommitmentUnpacked = sha256(balance[0..8], balance[0..8]);\n\
                            field computedNextBalanceCommitment = pack256(computedNextBalanceCommitmentUnpacked);\n\
                            field result = (computedBalanceCommitment == balanceCommitment && computedDepositCommitment == depositCommitment && computedNextBalanceCommitment == nextBalanceCommitment) ? 1 : 0;\n\
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

balance = ["10","10","10","10","10","10","10","0"]
deposit = ["1","1","1","1","1","1","1","0"]
balanceSalt = "123";
balance_commitment = "2263020269920326535379913946536157930309981988072413287532381426010114054880"
deposit_commitment = "8627118554770264612364788685127028490438563068465239045288132929770309574892"
next_balance_commitment = "17414540354115795881017331709404132267239592019171782565556596284149524496650"

generate_sender_proof(balance, deposit, balanceSalt, balance_commitment, deposit_commitment, next_balance_commitment)  



