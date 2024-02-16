import { cryptoAssets, cryptoData } from "./data";

export function fetchAssets(){

    return new Promise( (resolve)=>{
        setTimeout(() => {
            resolve(cryptoAssets);
        }, 0);
    })
}

export async function fetchNew(){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'X-API-KEY': 'LYX6/nW1Yco89A2Rx8MzFpy3Co2KABtyBEf956JOEyk='
        }
      };
      
      const response=await fetch('https://openapiv1.coinstats.app/coins', options);
      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }
        const data=await response.json();
        // console.log('actual ',data);
        return data;
}






