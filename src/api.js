import { cryptoAssets, cryptoData } from "./data";

export function fakeFetchCrypto(){

    return new Promise( (resolve)=>{
        setTimeout(() => {
            console.log(cryptoData);
            return resolve(cryptoData);
        }, 50);
    })
}

export function fetchAssets(){

    return new Promise( (resolve)=>{
        setTimeout(() => {
            resolve(cryptoAssets);
        }, 50);
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
        console.log('actual ',data);
        return data;
}







