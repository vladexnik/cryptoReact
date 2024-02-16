import { createContext, useState, useEffect, useContext } from 'react'
import { fetchAssets, fetchNew } from '../api'
import { percentDifference } from '../utils'
import { nanoid } from 'nanoid'

const CryptoContext = createContext({
  assets:  [],
  crypto: [],
  loading: false,
  dollarScore: localStorage.getItem('dollarScore') || 1000000
})

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [crypto, setCrypto] = useState([])
  const [assets, setAssets] = useState([])

  let [dollarScore, setDollarScore] = useState(localStorage.getItem('dollarScore') || 1000000);

  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);
    
      
      return {
        key: nanoid(),
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset,
      }
    })
  }

  useEffect(() => {
    async function preload() {
      setLoading(true)
      const {result}=await fetchNew();
      
      const assets=JSON.parse(localStorage.getItem('assets'));
      if(assets){
        setAssets(mapAssets(assets, result))
      }
      setCrypto(result);
      setLoading(false)
    }
    preload();
    // setDollarScore();
  }, [])

  useEffect(()=>{
    localStorage.setItem('dollarScore', dollarScore)
  },[dollarScore])

  function addAsset(newAsset) {
    const assetsLocal=JSON.parse(localStorage.getItem('assets')) || [];
    if(assetsLocal){
      localStorage.setItem('assets', JSON.stringify([...assetsLocal,newAsset]));
    }
    
    setAssets((prev) => mapAssets([...prev, newAsset], crypto))
    console.log(newAsset);
  }

  return (
    <CryptoContext.Provider value={{ loading, crypto, dollarScore, setDollarScore, assets, addAsset,setAssets }}>
      {children}
    </CryptoContext.Provider>
  )
}

export default CryptoContext
