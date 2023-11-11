const { initialize } = require('zokrates-js')
const fs = require('fs');

function generate_sender_proof(balance, balanceSalt, bidLeftA, bidRightA, bidLeftB, bidRightB, nextBidLeftA, nextBidRightA, nextBidLeftB, nextBidRightB, bidCommA, bidCommB, nextBidCommA, nextBidCommB, balComm, nextBalComm){
    initialize().then((zokratesProvider) => {
        const source =  'import "hashes/sha256/512bit" as sha256;\n\
                         import "utils/pack/u32/pack256" as pack256;\n\
                         def main(private u32[8] mut balance, private u32 balanceSalt, private u32[8] bidLeftA, private u32[8] bidRightA, private u32[8] bidLeftB, private u32[8] bidRightB, private u32[8] nextBidLeftA, private u32[8] nextBidRightA, private u32[8] nextBidLeftB, private u32[8] nextBidRightB, public field bidCommitmentA, public field bidCommitmentB, public field nextBidCommitmentA, public field nextBidCommitmentB, public field balanceCommitment, public field nextBalanceCommitment) -> field {\n\
                            u32[8] computedBidCommitmentUnpackedA = sha256(bidLeftA[0..8], bidRightA[0..8]);\n\
                            field computedBidCommitmentA = pack256(computedBidCommitmentUnpackedA);\n\
                            u32[8] computedBidCommitmentUnpackedB = sha256(bidLeftB[0..8], bidRightB[0..8]);\n\
                            field computedBidCommitmentB = pack256(computedBidCommitmentUnpackedB);\n\
                            u32[8] computedNextBidCommitmentUnpackedA = sha256(nextBidLeftA[0..8], nextBidRightA[0..8]);\n\
                            field computedNextBidCommitmentA = pack256(computedNextBidCommitmentUnpackedA);\n\
                            u32[8] computedNextBidCommitmentUnpackedB = sha256(nextBidLeftB[0..8], nextBidRightB[0..8]);\n\
                            field computedNextBidCommitmentB = pack256(computedNextBidCommitmentUnpackedB);\n\
                            u32[8] computedBalanceCommitmentUnpacked = sha256(balance[0..8], balance[0..8]);\n\
                            field computedBalanceCommitment = pack256(computedBalanceCommitmentUnpacked);\n\
                            for u32 i in 0..7 {\n\
                                bool increased = (nextBidLeftA[i] - nextBidLeftB[i]) >= (bidLeftA[i] - bidLeftB[i]) ? true : false;\n\
                                bool decreased = (nextBidRightA[i] - nextBidRightB[i]) <= (bidRightA[i] - bidRightB[i]) ? true : false;\n\
                                balance[i] = (increased == true && decreased == true) ? balance[i] + (bidLeftA[i] - bidLeftB[i]) - (nextBidLeftA[i] - nextBidLeftB[i]) : balance[i];\n\
                            }\n\
                            balance[7] = balanceSalt;\n\
                            u32[8] computedNextBalanceCommitmentUnpacked = sha256(balance[0..8], balance[0..8]);\n\
                            field computedNextBalanceCommitment = pack256(computedNextBalanceCommitmentUnpacked);\n\
                            field result = (computedBidCommitmentA == bidCommitmentA && computedBidCommitmentB == bidCommitmentB && computedNextBidCommitmentA == nextBidCommitmentA && computedNextBidCommitmentB == nextBidCommitmentB && computedBalanceCommitment == balanceCommitment && computedNextBalanceCommitment == nextBalanceCommitment) ? 1 : 0;\n\
                            return result;\n\
                        }'

        const artifacts = zokratesProvider.compile(source);
    
        const { witness, output } = zokratesProvider.computeWitness(artifacts, [balance, balanceSalt, bidLeftA, bidRightA, bidLeftB, bidRightB, nextBidLeftA, nextBidRightA, nextBidLeftB, nextBidRightB, bidCommA, bidCommB, nextBidCommA, nextBidCommB, balComm, nextBalComm]);

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
bidLeftA = ["2","1","1","1","1","1","1","123"];
bidRightA = ["1","2","1","1","1","1","1","123"];
bidLeftB = ["1","1","1","1","1","1","1","123"];
bidRightB = ["1","1","1","1","1","1","1","123"];
nextBidLeftA = ["3","1","1","1","1","1","1","124"];
nextBidRightA = ["1","2","1","1","1","1","1","124"];
nextBidLeftB = ["1","1","1","1","1","1","1","124"];
nextBidRightB = ["1","1","1","1","1","1","1","124"];

bidCommA = "3248123155565301227085799217815501141768051696581780262526242211419397446656"
bidCommB = "17139950852743717153461099515332307312404728447109218670938025162662626734028"
nextBidCommA = "4052135326402637699701942031014688435398630985173973018844131498423404660360"
nextBidCommB = "14705579063533810107661063714583876616046265577400464638345440309087672118884"

balComm = "11415463656462757035752808758259192965416857855602890597554528101310551497639"
nextBalComm = "20025492087569576312801218130200459826362474135941663905446439953920783743958"

generate_sender_proof(balance, balanceSalt, bidLeftA, bidRightA, bidLeftB, bidRightB, nextBidLeftA, nextBidRightA, nextBidLeftB, nextBidRightB, bidCommA, bidCommB, nextBidCommA, nextBidCommB, balComm, nextBalComm)  
