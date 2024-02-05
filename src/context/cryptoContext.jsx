import {createContext, useState,useEffect} from 'react';
import { fakeFetchCrypto, fetchAssets } from "../api";
import {precentDifference} from '../utils'

const CryptoContext= createContext({
    assets: [],
    crypto: [],
    loading: false
})

export function CryptoContextProvider({children}){

    const [loading,setLoading]=useState(false);
    const [crypto,setCrypto]=useState([]);
    const [assets,setAssets]=useState([]);


    useEffect(()=>{
        async function loadInfo(){
            setLoading(true);
            const { result }=await fakeFetchCrypto();
            const assets=await fetchAssets();
            
            setAssets(assets.map((asset)=>{
                console.log(asset);
                const coin=result.find((c)=> c.id===asset.id)

                return {
                    grow: asset.price < coin.price, // boolean green red
                    growPercent: precentDifference(asset.price, coin.price),
                    totalAmount: asset.amount*coin.price,
                    totalProfit: asset.amount*coin.price - asset.amount*asset.price,
                    ...asset
                }
            }));
            setCrypto(result);
            setLoading(false);
        }

        loadInfo();
    },[])

    return <CryptoContext.Provider value={{loading, crypto, assets}}>{children}</CryptoContext.Provider>
}

export default CryptoContext;




