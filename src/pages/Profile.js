import { useSDK } from "@metamask/sdk-react";
import { connect } from "../utils/utils";
import { useState, useEffect } from "react";
import PaginatedList from "../components/PaginatedList";
import Navbar from "../components/Navbar";
import config from "../config";

function Profile() {
    const [account, setAccount] = useState();
    const [balances, setBalance] = useState();

    const { sdk, connected, connecting, provider, chainId } = useSDK();

    connect(sdk, setAccount);

    const getBalances1inch = async (chainId, walletAddress) => {
        try {
            console.log(chainId, walletAddress);
            const resp = await fetch(config.BASE + '/getWalletBalances', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ chainId: chainId, walletAddress: walletAddress })
            });

            console.log(walletAddress);

            if (resp.ok) {
                const data = await resp.json();

                console.log(data);
                setBalance(data);
            } else {
                console.error(resp.error);
            }

        } catch (err) {
            console.error(err);
        }
    }

    // useEffect(() => {
    //     getBalances1inch(chainId, account);
    // }, [sdk, account]);

    return (
        <div className="container w-50">
            <Navbar />
            <div className='row justify-content-center'>
                <div className='col'>
                    <button onClick={connect} className='btn btn-primary'>Connect</button>
                    {connecting &&
                        <div className='alert alert-info'>
                            Connecting to your wallet...
                        </div>
                    }
                    {connected && (
                        <div>
                            <>
                                {chainId && `Connected chain: ${chainId}`}
                                <p></p>
                                {account && `Connected account: ${account}`}
                            </>
                        </div>
                    )}
                </div>
            </div>

            {/* <div className="divider"></div> */}
            <div className="row">
                <hr />
                <div className="row"><p className="display-1">
                    Balances</p></div>



                <div className="row">Address: {account}</div>


            </div>

            {balances &&
                <div>
                    <PaginatedList items={balances} itemsPerPage={10} />
                </div>
            }

        </div>

    )

}

export default Profile;
