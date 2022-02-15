import {concat, hexlify, toUtf8Bytes} from "ethers/lib/utils";

const { ethers } = require("ethers")
require('dotenv').config()

const provider = new ethers.providers.InfuraProvider("ropsten", process.env.INFURAKEY)
const wallet = new ethers.Wallet(process.env.PRIVATEKEY, provider)

const address = "0x38cB7800C3Fddb8dda074C1c650A155154924C73"
const remote = "0x71c46Ed333C35e4E6c62D32dc7C8F00D125b4fee"
const ABI = [
    "function guess(uint8 n) public payable",
]

async function callContract(){
    const contract = new ethers.Contract( remote, ABI, wallet)
    const options = {value: ethers.utils.parseEther("1.0") , gasLimit: 100000};
    let tx = await contract.guess(42, options)

    console.log(tx)

}

callContract()