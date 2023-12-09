import React, { useState, useEffect } from 'react';
import { useSDK } from '@metamask/sdk-react';
import PaginatedList from '../components/PaginatedList';
import config from '../config';
import Navbar from '../components/Navbar';
import { connect } from '../utils/utils';

function Home() {

  const BASE = config.BASE;

  const [account, setAccount] = useState();
  const [error, setError] = useState();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  // token data
  const [tokensList, setTokensList] = useState([]);
  const [gettingTokenList, setGettingTokenList] = useState(false);
  const [gotTokenList, setGotTokenList] = useState(false);

  connect(sdk, setAccount);

  const refreshTokenList = async () => {
    setGotTokenList(false);
    getTokenList1inch();
  }

  const getTokenList1inch = async () => {
    setGettingTokenList(true);
    try {
      const res = await fetch(BASE + "/getTokenList", {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (res.ok) {
        const data = await res.json();
        setGettingTokenList(false);
        setGotTokenList(true);
        const mdata = data.data.map((elem) => { return { name: elem, symbol: elem.split(" ")[0] }})
        setTokensList(mdata);
      } else {
        setError(res.error);
        console.error(res);
      }
    } catch(err) {
      setError(err);
      console.error(error);
    }
  }

  // useEffects 

  useEffect(() => {
    getTokenList1inch();
  }, []);

  return (
    <div className="container">
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

      <div className="row">
            <button className='btn btn-info' onClick={refreshTokenList}>Refresh List</button>
            {gettingTokenList && (
              <div>
                Loading token list for swapping...
              </div>
            )}

            {error && (
              <div className='alert alert-error'>{error}</div>
            )}

            {gotTokenList && tokensList && (
              <PaginatedList items={tokensList} itemsPerPage={100} />
            )}
      </div>
    </div>
  );
}

export default Home;
