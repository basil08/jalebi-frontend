import { useSDK } from "@metamask/sdk-react";
import { connect } from "../utils/utils";
import { useState, useEffect } from "react";
import PaginatedList from "../components/PaginatedList";



function Profile() {
    const [account, setAccount] = useState();
    const [balances, setBalance] = useState();

    const { sdk, connected, connecting, provider, chainId } = useSDK();

    connect(sdk, setAccount);

    useEffect(async () => {
        try {
            const resp = await fetch('/getWalletBalances', {
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ chainId: chainId, walletAddress: account })
            });

            if (resp.ok) {
                const data = await resp.json();
        
                console.log(data);
                setBalance(data);
            } else {
                console.error(resp.error);
            }
    
        } catch(err) {
            console.error(err);
        }
    }, []);


    return (
        <div className="container">
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

            {balances && 
            <div>
                <PaginatedList items={balances} itemsPerPage={10} />
            </div>
            }

        </div>

    )

}

export default Profile;
