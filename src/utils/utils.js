
const connect = async (sdk, setAccount) => {
    try {
        const accounts = await sdk?.connect();
        setAccount(accounts[0]);
    }
    catch (err) {
        console.warn("Failed to connect...", err);
    }
}



export { connect };