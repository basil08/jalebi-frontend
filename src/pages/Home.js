import React, { useState, useEffect } from 'react';
import { useSDK } from '@metamask/sdk-react';
import PaginatedList from '../components/PaginatedList';
import config from '../config';
import Navbar from '../components/Navbar';

function Home() {


    const [account, setAccount] = useState();
    const { sdk, connected, connecting, provider, chainId } = useSDK();

    // token data
    const [tokensList, setTokensList] = useState([]);
    const [gettingTokenList, setGettingTokenList] = useState(false);
    const [gotTokenList, setGotTokenList] = useState(false);


    const connect = async () => {
        try {
            const accounts = await sdk?.connect();
            setAccount(accounts[0]);
        }
        catch (err) {
            console.warn("Failed to connect...", err);
        }
    }

    const refreshTokenList = async () => {
        setGotTokenList(false);
        getTokenList1inch();
    }

    const getTokenList1inch = async () => {
        setGettingTokenList(true);
        try {
            const res = await fetch(config.BASE + "/getTokenList", {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.ok) {
                const data = await res.json();

                setGettingTokenList(false);
                setGotTokenList(true);

                
                const mdata = data.data.list.map((elem) => {
                    return {
                        name: elem, 
                        symbol: elem.split(" ")[0],
                        tokenAddress: data.data.address[data.data.list.indexOf(elem)]
                    }
                })
                setTokensList(mdata);
            } else {
                console.error(res);
                setTokensList([]);
                // return { status: 1, error: await res.json() };
            }
        } catch (err) {
            console.error(err);
            return { status: 1, error: err };
        }

        // if (mdata.status == 0) {
        //     console.log("MDATA", mdata);
        //     setGettingTokenList(false);
        //     setGotTokenList(true);
        //     setTokensList(mdata);
        // } else {
        //     console.log("Cannot fetch TOKEN LIST");
        //     console.log(mdata);
        // }
    }

    // useEffects 

    const disconnectWallet = async () => {
        await window.ethereum.request({
            "method": "wallet_revokePermissions",
            "params": [
                {
                    "eth_accounts": {}
                }
            ]
        });
    }

    useEffect(() => {
        getTokenList1inch();
    }, []);

    return (
        <div className="container">
            <Navbar />
            <div className='container w-50'>
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
                                    <button className='btn btn-outline-primary' onClick={() => disconnectWallet()}>Disconnect</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="row">
                    <button className='btn btn-primary' onClick={refreshTokenList}>Refresh List</button>
                    {gettingTokenList && (
                        <div>
                            Loading token list for swapping...
                        </div>
                    )}

                    {/* {error && (
            //   <div className='alert alert-error'>{error}</div>
            )} */}

                    {tokensList && tokensList.length > 0 && (
                        <PaginatedList items={tokensList} itemsPerPage={10} />
                    )}
                </div>

                <div className='row'>
                    <p>{gotTokenList && tokensList && tokensList.length <= 0 && "Cannot fetch token list"}</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
