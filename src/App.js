import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";

// --- 1. THE ABI ---
const auctionABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "AuctionClosed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Banned",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "BidTooLow",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Inactive",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidFee",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NoFunds",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotFound",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TimeError",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TransferFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Unauthorized",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "AuctionCanceled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "seller",
        "type": "address"
      }
    ],
    "name": "AuctionCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "AuctionFulfilled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "bidder",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "BidPlaced",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "FundsClaimed",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "LISTING_FEE",
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
    "name": "PERMANENT_OWNER",
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
    "name": "auctionCount",
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
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "auctions",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address payable",
        "name": "seller",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "startPrice",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endBlock",
        "type": "uint256"
      },
      {
        "internalType": "address payable",
        "name": "highestBidder",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "highestBid",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "fulfilled",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "canceled",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "exists",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_seller",
        "type": "address"
      }
    ],
    "name": "banSeller",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "bannedSellers",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "cancelAuction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "changeOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "contractOwner",
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
    "inputs": [
      {
        "internalType": "string",
        "name": "_title",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_startPrice",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_durationBlocks",
        "type": "uint256"
      }
    ],
    "name": "createAuction",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "destroyContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "fulfillAuction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getListingFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isDestroyed",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "pendingReturns",
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
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "placeBid",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalCollectedFees",
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
    "name": "withdrawFees",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// --- 2. THE APP COMPONENT ---
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      contractOwner: "",
      contractBalance: "0",
      collectedFees: "0",
      auctions: [],
      pendingReturn: "0",
      currentBlock: 0, // ADDED: To track blocks left
      // Form inputs
      newTitle: "",
      newPrice: "",
      newDuration: "",
      bidInputs: {}, 
      newOwnerAddress: "",
      banSellerAddress: "",
      isOwner: false,
      permanentOwner: "0x153dfef4355E823dCB0FCc76Efe942BefCa86477"
    };

    // YOUR DEPLOYED ADDRESS
    this.contractAddress = "0x314524D1D900Dd643ea61e40298F49aF46Ea9C30";
  }

  async componentDidMount() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.web3.eth.getAccounts();
        this.setState({ account: accounts[0] });

        this.contract = new window.web3.eth.Contract(
          auctionABI,
          this.contractAddress
        );

        this.loadBlockchainData();

        // Listen for all events to update UI automatically
        this.contract.events.AuctionCreated({}, () => this.loadBlockchainData());
        this.contract.events.BidPlaced({}, () => this.loadBlockchainData());
        this.contract.events.AuctionFulfilled({}, () => this.loadBlockchainData());
        this.contract.events.AuctionCanceled({}, () => this.loadBlockchainData());
        this.contract.events.FundsClaimed({}, () => this.loadBlockchainData());

        window.ethereum.on("accountsChanged", (accounts) => {
          this.setState({ account: accounts[0] }, () => this.loadBlockchainData());
        });

      } catch (error) {
        console.error("User denied web3 access", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  }

  loadBlockchainData = async () => {
    if (!this.contract) return;
    try {
      const { account, permanentOwner } = this.state;

      // FIX 1: Prevent Validator Error by ensuring account exists
      if (!account) return;

      const owner = await this.contract.methods.contractOwner().call();
      const isOwner = (account.toLowerCase() === owner.toLowerCase()) || 
                      (account.toLowerCase() === permanentOwner.toLowerCase());

      const balanceWei = await window.web3.eth.getBalance(this.contractAddress);
      // NOTE: .toString() is used to handle BigInt return values safely
      const feesWei = await this.contract.methods.totalCollectedFees().call();
      const myPendingReturn = await this.contract.methods.pendingReturns(account).call();

      // Get current block to calculate time left
      const currentBlock = await window.web3.eth.getBlockNumber();

      const auctionCount = await this.contract.methods.auctionCount().call();
      let loadedAuctions = [];
      for (let i = 1; i <= auctionCount; i++) {
        const auction = await this.contract.methods.auctions(i).call();
        loadedAuctions.push(auction);
      }

      this.setState({
        contractOwner: owner,
        isOwner: isOwner,
        contractBalance: window.web3.utils.fromWei(balanceWei.toString(), "ether"),
        collectedFees: window.web3.utils.fromWei(feesWei.toString(), "ether"),
        pendingReturn: window.web3.utils.fromWei(myPendingReturn.toString(), "ether"),
        currentBlock: Number(currentBlock), // Convert BigInt to Number
        auctions: loadedAuctions,
      });
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  createAuction = async () => {
    const { newTitle, newPrice, newDuration, account } = this.state;
    // Fee is "0" for the Lite contract version.
    const listingFee = window.web3.utils.toWei("0", "ether"); 
    const startPriceWei = window.web3.utils.toWei(newPrice, "ether");

    await this.contract.methods
      .createAuction(newTitle, startPriceWei, newDuration)
      .send({ from: account, value: listingFee });
  };

  placeBid = async (auctionId) => {
    const amountEth = this.state.bidInputs[auctionId];
    if (!amountEth) return;
    const amountWei = window.web3.utils.toWei(amountEth, "ether");
    
    await this.contract.methods.placeBid(auctionId).send({ from: this.state.account, value: amountWei });
  };

  fulfillAuction = async (id) => {
    await this.contract.methods.fulfillAuction(id).send({ from: this.state.account });
  };

  cancelAuction = async (id) => {
    await this.contract.methods.cancelAuction(id).send({ from: this.state.account });
  };

  claimFunds = async () => {
    await this.contract.methods.claim().send({ from: this.state.account });
  };

  withdrawFees = async () => {
    await this.contract.methods.withdrawFees().send({ from: this.state.account });
  };

  banSeller = async () => {
    await this.contract.methods.banSeller(this.state.banSellerAddress).send({ from: this.state.account });
  };

  changeOwner = async () => {
    await this.contract.methods.changeOwner(this.state.newOwnerAddress).send({ from: this.state.account });
  };

  destroyContract = async () => {
    await this.contract.methods.destroyContract().send({ from: this.state.account });
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleBidChange = (id, value) => {
    this.setState(prevState => ({
      bidInputs: { ...prevState.bidInputs, [id]: value }
    }));
  };

  render() {
    const { 
      account, contractOwner, contractBalance, collectedFees, 
      auctions, pendingReturn, isOwner, currentBlock 
    } = this.state;
    
    const liveAuctions = auctions.filter(a => !a.fulfilled && !a.canceled);
    const fulfilledAuctions = auctions.filter(a => a.fulfilled);
    const canceledAuctions = auctions.filter(a => a.canceled);

    return (
      <div className="App">
        <header className="header-section">
          <h1>Auction DApp</h1>
          <div className="info-row">
            <label>Current Address</label>
            <div className="address-box">{account}</div>
          </div>
          <div className="info-row">
            <label>Owner's Address</label>
            <div className="address-box">{contractOwner}</div>
          </div>
          <div className="stats-row">
            <div className="stat-item">
               <label>Balance</label>
               <span className="stat-box">{contractBalance}</span>
            </div>
            <div className="stat-item">
               <label>Collected fees</label>
               <span className="stat-box">{collectedFees}</span>
            </div>
          </div>
        </header>

        <section className="app-section">
          <h2>New auction</h2>
          <div className="form-grid">
            <div className="form-row">
                <label>Title</label>
                <input name="newTitle" onChange={this.handleInputChange} />
            </div>
            <div className="form-row">
                <label>Initial price</label>
                <input name="newPrice" onChange={this.handleInputChange} />
            </div>
            <div className="form-row">
                <label>Duration in blocks</label>
                <input name="newDuration" onChange={this.handleInputChange} />
            </div>
            <div className="form-row btn-row">
                <button 
                  onClick={this.createAuction} 
                  disabled={isOwner} 
                  className={`btn btn-create ${isOwner ? 'disabled' : ''}`}
                >
                  Create
                </button>
            </div>
          </div>
        </section>

        <section className="app-section">
          <h2>Live auctions</h2>
          <table className="auction-table">
            <thead>
              <tr>
                <th>Seller</th>
                <th>Title</th>
                <th>Current Price / Blocks Left / You made it</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {liveAuctions.map(auction => {
                // FIX 2: Handle BigInt logic safely for rendering
                const endBlockNum = Number(auction.endBlock);
                const blocksLeft = Math.max(0, endBlockNum - currentBlock);
                const highestBidStr = window.web3.utils.fromWei(auction.highestBid.toString(), "ether");

                return (
                  <tr key={auction.id}>
                    <td>{auction.seller ? auction.seller : "Unknown"}</td>
                    <td>{auction.title}</td>
                    <td>
                        <span className="price-tag">| {highestBidStr} |</span>
                        <span className="time-tag"> {blocksLeft} |</span>
                        <span className="bidder-tag"> {auction.highestBidder.toLowerCase() === account.toLowerCase() ? "1" : "0"} |</span>
                    </td>
                    <td className="action-cell">
                      <input 
                          className="bid-input"
                          onChange={(e) => this.handleBidChange(auction.id, e.target.value)}
                        />
                      <button onClick={() => this.placeBid(auction.id)} className="btn btn-bid">Bid</button>
                      
                      {(auction.seller.toLowerCase() === account.toLowerCase() || isOwner) && (
                          <>
                            <button onClick={() => this.cancelAuction(auction.id)} className="btn btn-cancel">Cancel</button>
                            <button onClick={() => this.fulfillAuction(auction.id)} className="btn btn-fulfill">Fulfill</button>
                          </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section className="app-section">
          <h2>Fulfilled auctions</h2>
          <div className="list-container">
            {fulfilledAuctions.map(auction => (
                <div key={auction.id} className="list-row">
                    <span>{auction.seller}</span>
                    <span>{auction.title}</span>
                    <span>| {window.web3.utils.fromWei(auction.highestBid.toString(), "ether")} |</span>
                    <span>0 | 0 |</span>
                </div>
            ))}
          </div>
        </section>

        <section className="app-section">
          <h2>Canceled auctions</h2>
          <div className="claim-header">
             <button 
               onClick={this.claimFunds} 
               disabled={pendingReturn === "0"} 
               className={`btn btn-claim ${pendingReturn === "0" ? 'disabled' : ''}`}
             >
               Claim
             </button>
             {pendingReturn !== "0" && <span className="claim-info">You have {pendingReturn} ETH to claim</span>}
          </div>
          <div className="list-container">
            {canceledAuctions.map(auction => (
              <div key={auction.id} className="list-row">
                 <span>{auction.seller}</span>
                 <span>{auction.title}</span>
              </div>
            ))}
          </div>
        </section>

        {isOwner && (
          <section className="app-section control-panel">
            <h2>Control Panel</h2>
            <div className="panel-row">
                <button className="btn btn-panel" onClick={this.withdrawFees}>Withdraw</button>
            </div>
            
            <div className="panel-row">
              <button className="btn btn-panel" onClick={this.changeOwner}>Change owner</button>
              <input className="panel-input" name="newOwnerAddress" placeholder="Enter new owner's wallet address" onChange={this.handleInputChange} />
            </div>

            <div className="panel-row">
              <button className="btn btn-panel" onClick={this.banSeller}>Ban entrepreneur</button>
              <input className="panel-input" name="banSellerAddress" placeholder="Enter entrepreneur's address" onChange={this.handleInputChange} />
            </div>

            <div className="panel-row">
                <button onClick={this.destroyContract} className="btn btn-panel">Destroy</button>
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default App;