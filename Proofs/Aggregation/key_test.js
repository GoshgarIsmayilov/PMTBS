const { initialize } = require('zokrates-js')
const fs = require('fs');

function generate_sender_proof(myBidLeft, myBidRight, pairBidLeft, pairBidRight, myBidCommitment, pairBidCommitment, sumBidCommitment){
    initialize().then((zokratesProvider) => {
        const source =  'import "hashes/sha256/512bit" as sha256;\n\
                        import "utils/pack/u32/pack256" as pack256;\n\
                        def main(private u32[8] mut myBidLeft, private u32[8] mut myBidRight, private u32[8] pairBidLeft, private u32[8] pairBidRight, public field myBidCommitment, public field pairBidCommitment, public field sumBidCommitment) -> field {\n\
                            u32[8] computedMyBidCommitmentUnpacked = sha256(myBidLeft[0..8], myBidRight[0..8]);\n\
                            field computedMyBidCommitment = pack256(computedMyBidCommitmentUnpacked);\n\
                            u32[8] computedPairBidCommitmentUnpacked = sha256(pairBidLeft[0..8], pairBidRight[0..8]);\n\
                            field computedPairBidCommitment = pack256(computedPairBidCommitmentUnpacked);\n\
                            for u32 i in 0..7 {\n\
                                myBidLeft[i] = myBidLeft[i] + pairBidLeft[i];\n\
                                myBidRight[i] = myBidRight[i] + pairBidRight[i];\n\
                            }\n\
                            u32[8] computedSumBidCommitmentUnpacked = sha256(myBidLeft[0..8], myBidRight[0..8]);\n\
                            field computedSumBidCommitment = pack256(computedSumBidCommitmentUnpacked);\n\
                            field result = (computedMyBidCommitment == myBidCommitment && computedPairBidCommitment == pairBidCommitment && computedSumBidCommitment == sumBidCommitment) ? 1 : 0;\n\
                            return result;\n\
                        }'

        const artifacts = zokratesProvider.compile(source);
    
        const { witness, output } = zokratesProvider.computeWitness(artifacts, [myBidLeft, myBidRight, pairBidLeft, pairBidRight, myBidCommitment, pairBidCommitment, sumBidCommitment]);

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


myBidLeft = ["1","0","0","0","0","0","0","123"]
myBidRight = ["0","1","0","0","0","0","0","123"]
pairBidLeft = ["0","1","0","0","0","0","0","124"]
pairBidRight = ["1","0","0","0","0","0","0","124"]

myBidCommitment = "6426856340006210429108493894252858558116575979735037780906028924963057686951"
pairBidCommitment = "3849519921315560022235413126709192569985956821300635772351510930396724055271"
sumBidCommitment = "7845240235758536626378537773594982056808600560280477294570951363077329625323"

generate_sender_proof(myBidLeft, myBidRight, pairBidLeft, pairBidRight, myBidCommitment, pairBidCommitment, sumBidCommitment)  



