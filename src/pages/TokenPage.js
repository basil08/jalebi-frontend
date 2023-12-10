import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import config from "../config";
import { Link } from 'react-router-dom';

function TokenPage() {

    const [tokenData, setTokenData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const { symbol } = useParams();

    const getTokenInfo = async (symbol) => {
        try {
            setIsLoading(true);
            console.log(config.BASE + '/getTokenInfo');
            const resp = await fetch(config.BASE + '/getTokenInfo', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ symbol: symbol })
            });

            if (resp.ok) {
                const data = await resp.json();
                console.log(data);
                setIsLoading(false);
                setTokenData(data.data);
            } else {
                console.error(resp.error);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="container">
            <Navbar />
            <div className='container w-50'>
                <div className='row'>
                    <div className='text-center'>
                        <button className='btn btn-primary' onClick={() => getTokenInfo(symbol)}>Fetch Token Info</button>
                    </div>
                </div>
                {tokenData &&
                    <>
                        <div className='row mt-2 mb-2'>
                            <div className='col-6'>

                                <div className='card p-3'>
                                    <div className='display-1'>{tokenData.symbol}</div>
                                    <div>Chain ID: {tokenData.chainId}</div>
                                    <div>Name: {tokenData.name}</div>
                                    <div>Token Address: {tokenData.address}</div>
                                </div>
                            </div>
                            <div className='col-6'>
                                {tokenData.logoURI &&
                                    <img className="img-responsive bg-white p-1" width="100%" src={`${tokenData.logoURI}`} />
                                }
                            </div>
                        </div>
                        <div className='row'>
                            <Link to={`/token/${symbol}/${tokenData.address}/${tokenData.chainId}/swap`}>
                                <p className='btn btn-primary mt-3'>SWAP {tokenData.symbol}</p>
                            </Link>
                        </div>
                    </>

                }

                <div className="row">
                    {isLoading &&
                        <div className='spinner'></div>
                    }
                </div>
            </div>
        </div>
    )
}


export default TokenPage;