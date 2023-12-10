import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import config from "../config";
import { useEffect, useState } from "react";
import { getTokensListUtil } from "../utils/utils";
import { useSDK } from "@metamask/sdk-react";

const SwapPage = () => {

    const { symbol, address } = useParams();
    const [account, setAccount] = useState();
    const [amount, setAmount] = useState();
    const [fromTokenAddress, setFromTokenAddress] = useState();
    // const [toTokenAddress, setToTokenAddress] = useState();

    const { sdk, connected, connecting, provider, chainId } = useSDK();


    const [bestGas, setBestGas] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [tokenList, setTokenList] = useState();

    const connect = async () => {
        try {
            const accounts = await sdk?.connect();
            setAccount(accounts[0]);
        }
        catch (err) {
            console.warn("Failed to connect...", err);
        }
    }

    connect();

    const getBestGasData = async () => {
        try {
            setIsLoading(true);
            const resp = await fetch(config.BASE + '/gas-price', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (resp.ok) {
                const data = await resp.json();
                setIsLoading(false);
                setBestGas(data.data);
            } else {
                console.error(await resp.json());
            }

        } catch (err) {
            console.error(err);
        }
    }


    const getTokensListAsync = async () => {
        const list = await getTokensListUtil();
        setTokenList(list);
    }

    const submitQuoteForm = async () => {
        try {

            const response = await fetch(config.BASE + "/get-fusion-quote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fromTokenAddress: fromTokenAddress,
                    toTokenAddress: address,
                    amount: amount,
                    walletAddress: account,
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                console.error(await response.json());
            }
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    return (
        <div className="container">
            <Navbar />
            <div className="container w-50">
                <div className='row'>
                    <div className='col text-center'>
                        <button onClick={connect} className='btn btn-primary'>Connect</button>
                        {connecting &&
                            <div className='alert alert-info'>
                                Connecting to your wallet...
                            </div>
                        }
                        {connected && (
                            <>
                                <div className='d-flex pl-2 pr-2 pb-3'>
                                    {chainId && `Connected chain: ${chainId}`}
                                    {account && `Connected account: ${account}`}
                                    {/* <button className='btn btn-outline-primary' onClick={() => disconnectWallet()}>Disconnect</button> */}
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="display-3">Swapping ${symbol}</div>
                <hr />

                <div className='row'>
                    <div className='text-center'>
                        <button className='btn btn-primary' onClick={() => getBestGasData()}>Fetch Best Gas Prices</button>
                    </div>
                </div>

                <div>
                    {isLoading &&
                        <div>Loading Best Gas Fees...</div>
                    }
                </div>
                <div>
                    {bestGas && (
                        <>
                            <div className="text-small">Use the below data to set appropriate gas prices</div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <td>Range</td>
                                        <td>Max Priority Fee Per Gas</td>
                                        <td>Max Fee Per Gas</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Low</td>
                                        <td>{bestGas.low.maxPriorityFeePerGas}</td>
                                        <td>{bestGas.low.maxFeePerGas}</td>
                                    </tr>

                                    <tr>
                                        <td>Medium</td>
                                        <td>{bestGas.medium.maxPriorityFeePerGas}</td>
                                        <td>{bestGas.medium.maxFeePerGas}</td>
                                    </tr>

                                    <tr>
                                        <td>High</td>
                                        <td>{bestGas.high.maxPriorityFeePerGas}</td>
                                        <td>{bestGas.high.maxFeePerGas}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    )}
                </div>

                <hr />

                <div className="row">
                    <div className="display-4">Order Quote</div>

                    <form method="POST" onSubmit={(e) => { e.preventDefault(); submitQuoteForm() }} className="p-3 rounded" style={{ backgroundColor: "#fff" }}
                    >

                        <div className="row">
                            <div className="col-3">
                                <button className="btn btn-outline-primary" onClick={() => getTokensListAsync()}>Load</button>
                            </div>
                            <div className="col-9">
                                <select class="form-select bg-white" onChange={(e) => setFromTokenAddress(e.target.value)} aria-label="Default select example">
                                    <option selected>fromTokenAddress</option>
                                    {tokenList && tokenList.length > 0 && tokenList.map((elem, index) => {
                                        return (
                                            <option value={`${elem.tokenAddress}`}>{elem.symbol + " - " + elem.tokenAddress}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>

                        <label for="toTokenField">toTokenAddress</label>
                        <input id="toTokenField" className=" bg-white text form-control disabled" disabled value={symbol} />

                        {/* <select class="form-select bg-white" onChange={(e) => setToTokenAddress(e.target.value)} aria-label="Default select example">
                            <option selected>toTokenAddress</option>
                            {tokenList && tokenList.length > 0 && tokenList.map((elem, index) => {
                                return (
                                    <option value={`${elem.tokenAddress}`}>{elem.symbol + " - " + elem.tokenAddress}</option>
                                )
                            })}

                        </select> */}


                        <select class="form-select bg-white" aria-label="Default select example">
                            <option selected>walletAddress</option>
                            <option>{account}</option>

                        </select>

                        <label for="amountField">Amount (in Wei)</label>
                        <input id="amountField" className="text form-control bg-white" onChange={(e) => setAmount(e.target.value)} />

                        <button className="btn btn-primary">Get Quote</button>
                    </form>

                </div>
            </div>
        </div>
    )
}




export default SwapPage;