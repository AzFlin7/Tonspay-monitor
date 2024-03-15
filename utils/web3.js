const Web3 = require('web3')
const config = require("../config.json")
require('dotenv').config()
var BigNumber = require("bignumber.js")
const web3 = new Web3(new Web3.providers.HttpProvider(config.bsc.httpProvider[0]))

/**
 * 🚀Event check
 */
async function payAnalyzeByHash(hash)
{
    var lettry = 0 ;
    while(true)
    {
        var _w3 = web3
        var ret = await getEventByHash(_w3,hash);
        if(ret.logs)
        {
            try{
                const _abi = getRouterAbi();
                for(var i = 0 ; i < ret.logs.length ; i ++)
                {

                        if(ret.logs[i].topics[0] == "")
                        {
                            var decode = await web3.eth.abi.decodeLog(_abi[1].inputs, ret.logs[i].data,  ret.logs[i].topics);
                            console.log(decode)
                        }
                }
            }catch(e)
            {

            }
            return 0;
        }else{
            if(lettry > 10)
            {
                return false;
            }
        }
        lettry++;
    }

}

function getRouterAbi()
{
    return [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "id",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "originFrom",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amountFinal",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amountRouter",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "isPrepaid",
              "type": "bool"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "time",
              "type": "uint256"
            }
          ],
          "name": "pay",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "id",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "originFrom",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amountFinal",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amountRouter",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "isPrepaid",
              "type": "bool"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "time",
              "type": "uint256"
            }
          ],
          "name": "payToken",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "time",
              "type": "uint256"
            }
          ],
          "name": "withdraw",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "time",
              "type": "uint256"
            }
          ],
          "name": "withdrawToken",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "routerRate",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "routerRateDecimail",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "id",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isPre",
              "type": "bool"
            }
          ],
          "name": "transfer",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "id",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isPre",
              "type": "bool"
            }
          ],
          "name": "transferToken",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "withdrawTokens",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "withdraws",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
}