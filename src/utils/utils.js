import config from "../config";

const connect = async (sdk, setAccount) => {
    try {
        const accounts = await sdk?.connect();
        setAccount(accounts[0]);
    }
    catch (err) {
        console.warn("Failed to connect...", err);
    }
}


const getTokensListUtil = async () => {
    try {
        const res = await fetch(config.BASE + "/getTokenList", {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.ok) {
            const data = await res.json();
            const mdata = data.data.list.map((elem) => { return { 
                name: elem.split(" ")[-1], 
                symbol: elem.split(" ")[0], 
                tokenAddress: data.data.address[data.data.list.indexOf(elem)]}})
            return mdata;
        } else {
            console.error(res);
            return {status: 1, error: await res.json()};
        }
    } catch (err) {
        console.error(err);
        return {status: 1, error: err};
    }
}


export { connect, getTokensListUtil };