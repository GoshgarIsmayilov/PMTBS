import zokrates_hash from './zokrates-hash';
import zokrates_deposit_proof from './zokrates-deposit';
import zokrates_withdraw_proof from './zokrates-withdraw'; 
import zokrates_reproposal_proof from './zokrates-reproposal';
import zokrates_aggregation_proof from './zokrates-aggregation';
import zokrates_barter_proof from './zokrates-barter';

window.zokrates_hash = async function(left, right){
    return await zokrates_hash(left, right);
}

window.zokrates_deposit_proof = async function(balance, deposit, balanceSalt, balanceCommitment, depositCommitment, newBalanceCommitment){
    return await zokrates_deposit_proof(balance, deposit, balanceSalt, balanceCommitment, depositCommitment, newBalanceCommitment);
}

window.zokrates_withdraw_proof = async function(balance, withdraw, balanceSalt, balanceCommitment, withdrawCommitment, newBalanceCommitment){
    return await zokrates_withdraw_proof(balance, withdraw, balanceSalt, balanceCommitment, withdrawCommitment, newBalanceCommitment);
}

window.zokrates_reproposal_proof = async function(balance, balanceSalt, bidLeftA, bidRightA, bidLeftB, bidRightB, nextBidLeftA, nextBidRightA, nextBidLeftB, nextBidRightB, bidCommA, bidCommB, nextBidCommA, nextBidCommB, balComm, nextBalComm){
    return await zokrates_reproposal_proof(balance, balanceSalt, bidLeftA, bidRightA, bidLeftB, bidRightB, nextBidLeftA, nextBidRightA, nextBidLeftB, nextBidRightB, bidCommA, bidCommB, nextBidCommA, nextBidCommB, balComm, nextBalComm);
}

window.zokrates_aggregation_proof = async function(myBidLeft, myBidRight, pairBidLeft, pairBidRight, myBidCommitment, pairBidCommitment, sumBidCommitment){
    return await zokrates_aggregation_proof(myBidLeft, myBidRight, pairBidLeft, pairBidRight, myBidCommitment, pairBidCommitment, sumBidCommitment);
}

window.zokrates_barter_proof = async function(balance, balanceSalt, sumBidLeftA, sumBidRightA, sumBidLeftB, sumBidRightB, bidLeftA, bidRightA, bidLeftB, bidRightB, balanceCommitment, nextBalanceCommitment, sumBidCommitmentA, sumBidCommitmentB, bidCommitmentA, bidCommitmentB){
    return await zokrates_barter_proof(balance, balanceSalt, sumBidLeftA, sumBidRightA, sumBidLeftB, sumBidRightB, bidLeftA, bidRightA, bidLeftB, bidRightB, balanceCommitment, nextBalanceCommitment, sumBidCommitmentA, sumBidCommitmentB, bidCommitmentA, bidCommitmentB);
}
