export const TOKEN_ADDRESS = "0x5652dff017E4586cdd4c662927b2d5fB50D1cdC9" as const;
export const AIRDROP_ADDRESS = "0x82517606C510Cdff89784863e7a5570112aA7f1C" as const;

export const TOKEN_ABI = [
    { name:"name",        type:"function", stateMutability:"view",
    inputs:[], outputs:[{type:"string"}] },
  { name:"symbol",      type:"function", stateMutability:"view",
    inputs:[], outputs:[{type:"string"}] },
  { name:"balanceOf",   type:"function", stateMutability:"view",
    inputs:[{name:"account",type:"address"}], outputs:[{type:"uint256"}] },
  { name:"totalSupply", type:"function", stateMutability:"view",
    inputs:[], outputs:[{type:"uint256"}] },
] as const;

export const AIRDROP_ABI = [
    { name:"claim", type:"function", stateMutability:"nonpayable",
    inputs:[
      {name:"claimant", type:"address"},
      {name:"amount",   type:"uint256"},
      {name:"proof",    type:"bytes32[]"},
    ] },
  { name:"hasClaimed", type:"function", stateMutability:"view",
    inputs:[{type:"address"}], outputs:[{type:"bool"}] },
  { name:"merkelRoot", type:"function", stateMutability:"view",
    inputs:[], outputs:[{type:"bytes32"}] },
  { name:"updateMerkleRoot", type:"function", stateMutability:"nonpayable",
    inputs:[{name:"_newRoot",type:"bytes32"}] },
  { name:"getContractTokenBalance", type:"function", stateMutability:"view",
    inputs:[], outputs:[{type:"uint256"}] },
  { name:"AirdropClaimed", type:"event",
    inputs:[
      {name:"claimant",type:"address",indexed:true},
      {name:"amount",type:"uint256",indexed:false},
    ] },
] as const ;