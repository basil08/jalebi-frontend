import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function TokenPage() {

    const { symbol } = useParams();

    console.log(symbol);
    return (
        <div className="container">
            <Navbar />
            <div>Token Page: {symbol}</div>
        </div>
    )
}


export default TokenPage;