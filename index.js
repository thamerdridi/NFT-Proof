const { MerkleTree } = require('merkletreejs');
const SHA256 = require('crypto-js/sha256');

function addToNftList (nftMetaData, nftList){
    let nft = JSON.stringify(nftMetaData);
    if(!nftList.includes(nft)){
        nftList.push(nft);
    }
    else{
        console.log("nft already exists");
    }

    return nftList;
}

function createMerkleTree(nftList){
 return new MerkleTree(nftList, SHA256);
}

function nftExists(target, tree){
    const root = tree.getRoot().toString('hex');
    let _target= JSON.stringify(target);
    const proof = tree.getProof(_target);
    return tree.verify(proof, _target, root);
}


function main(){
    let list = [];
    list= addToNftList({"id":"512", "name":"nftTest", "owner":"thamer"}, list);
    let tree = createMerkleTree(list);
    console.log(nftExists({"id":"513", "name":"nftTest", "owner":"firas"}, tree));

}

main();