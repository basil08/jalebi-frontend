const ENDPOINT = "https://jalebi-backend.vercel.app";
// const ENDPOINT = undefined;

const config = {
    BASE: ENDPOINT ? ENDPOINT : 'http://localhost:8080',
} 
 
export default config;