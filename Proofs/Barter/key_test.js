const { initialize } = require('zokrates-js')
const fs = require('fs');

function generate_sender_proof(balance, balanceSalt, sumBidLeftA, sumBidRightA, sumBidLeftB, sumBidRightB, bidLeftA, bidRightA, bidLeftB, bidRightB, balanceCommitment, nextBalanceCommitment, sumBidCommitmentA, sumBidCommitmentB, bidCommitmentA, bidCommitmentB){
    initialize().then((zokratesProvider) => {
        const source = 'import "hashes/sha256/512bit" as sha256;\n\
                        import "utils/pack/u32/pack256" as pack256;\n\
                        def main(private u32[8] mut balance, private u32 balanceSalt, private u32[8] sumBidLeftA, private u32[8] sumBidRightA, private u32[8] sumBidLeftB, private u32[8] sumBidRightB, private u32[8] bidLeftA, private u32[8] bidRightA, private u32[8] bidLeftB, private u32[8] bidRightB, public field balanceCommitment, public field nextBalanceCommitment, public field sumBidCommitmentA, public field sumBidCommitmentB, public field bidCommitmentA, public field bidCommitmentB) -> field {\n\
                            u32[8] computedBalanceCommitmentUnpacked = sha256(balance[0..8], balance[0..8]);\n\
                            field computedBalanceCommitment = pack256(computedBalanceCommitmentUnpacked);\n\
                            u32[8] computedSumBidCommitmentUnpackedA = sha256(sumBidLeftA[0..8], sumBidRightA[0..8]);\n\
                            field computedSumBidCommitmentA = pack256(computedSumBidCommitmentUnpackedA);\n\
                            u32[8] computedSumBidCommitmentUnpackedB = sha256(sumBidLeftB[0..8], sumBidRightB[0..8]);\n\
                            field computedSumBidCommitmentB = pack256(computedSumBidCommitmentUnpackedB);\n\
                            u32[8] computedBidCommitmentUnpackedA = sha256(bidLeftA[0..8], bidRightA[0..8]);\n\
                            field computedBidCommitmentA = pack256(computedBidCommitmentUnpackedA);\n\
                            u32[8] computedBidCommitmentUnpackedB = sha256(bidLeftB[0..8], bidRightB[0..8]);\n\
                            field computedBidCommitmentB = pack256(computedBidCommitmentUnpackedB);\n\
                            bool mut hasSolution = true;\n\
                            for u32 i in 0..7 {\n\
                                hasSolution = ((sumBidLeftA[i] - sumBidLeftB[i]) >= (sumBidRightA[i] - sumBidRightB[i]) && hasSolution == true) ? true : false;\n\
                            }\n\
                            for u32 i in 0..7 {\n\
                                balance[i] = balance[i] + (bidRightA[i] - bidRightB[i]);\n\
                            }\n\
                            balance[7] = balanceSalt;\n\
                            u32[8] computedNextBalanceCommitmentUnpacked = sha256(balance[0..8], balance[0..8]);\n\
                            field computedNextBalanceCommitment = pack256(computedNextBalanceCommitmentUnpacked);\n\
                            field result = (computedBalanceCommitment == balanceCommitment && computedSumBidCommitmentA == sumBidCommitmentA && computedSumBidCommitmentB == sumBidCommitmentB && computedBidCommitmentA == bidCommitmentA && computedBidCommitmentB == bidCommitmentB && hasSolution == true && computedNextBalanceCommitment == nextBalanceCommitment) ? 1 : 0;\n\
                            return result;\n\
                        }'

        const artifacts = zokratesProvider.compile(source);
    
        const { witness, output } = zokratesProvider.computeWitness(artifacts, [balance, balanceSalt, sumBidLeftA, sumBidRightA, sumBidLeftB, sumBidRightB, bidLeftA, bidRightA, bidLeftB, bidRightB, balanceCommitment, nextBalanceCommitment, sumBidCommitmentA, sumBidCommitmentB, bidCommitmentA, bidCommitmentB]);

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

balance = ["9","10","10","10","10","10","10","123"]
balanceSalt = "124"
sumBidLeftA = ["2","2","1","1","1","1","1","123"]
sumBidRightA = ["2","2","1","1","1","1","1","123"]
sumBidLeftB = ["1","1","1","1","1","1","1","123"]
sumBidRightB = ["1","1","1","1","1","1","1","123"]
bidLeftA = ["2","1","1","1","1","1","1","123"]
bidRightA = ["1","2","1","1","1","1","1","123"]
bidLeftB = ["1","1","1","1","1","1","1","123"]
bidRightB = ["1","1","1","1","1","1","1","123"]

balanceCommitment = "11415463656462757035752808758259192965416857855602890597554528101310551497639"
nextBalanceCommitment = "11283069679380888267343708115342792576452394114242300645952914015408023993860"
sumBidCommitmentA = "18401088049966030897202615800259167843772548401481720189768700296801943448256"
sumBidCommitmentB = "17139950852743717153461099515332307312404728447109218670938025162662626734028"
bidCommitmentA = "3248123155565301227085799217815501141768051696581780262526242211419397446656"
bidCommitmentB = "17139950852743717153461099515332307312404728447109218670938025162662626734028"

generate_sender_proof(balance, balanceSalt, sumBidLeftA, sumBidRightA, sumBidLeftB, sumBidRightB, bidLeftA, bidRightA, bidLeftB, bidRightB, balanceCommitment, nextBalanceCommitment, sumBidCommitmentA, sumBidCommitmentB, bidCommitmentA, bidCommitmentB)  



