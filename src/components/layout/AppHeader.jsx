import {Layout, Select, Space, Button} from "antd";
import { useContext, useEffect, useState } from "react";
import CryptoContext from "../../context/cryptoContext";


const headerStyle = {
    textAlign: 'center',
    width: '100%',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent:'space-between',
    alignItems: 'center',

};


export default function AppHeader(){

   
    const [select,setSelect]=useState(false);
    const { crypto }=useContext(CryptoContext);

    useEffect(()=>{

        const keypress=(event)=>{
            if(event.key === "/") {
                setSelect(prev=> !prev)
        
            }
        }
        
        document.addEventListener("keypress", keypress);
        return () => document.removeEventListener("keypress", keypress);

    },[])

        function handleSelect(value){
            console.log(value);
        }

    return(
        <Layout.Header style={headerStyle}>
            <Select
                
                style={{
                width: '250px',
                }}
                open={select}
                onClick={()=>setSelect(prev=> !prev)}
                onSelect={handleSelect}
                value='press / to open'
                optionLabelProp="label"
                options={crypto.map(coin=>({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon
                }))}
                optionRender={(option) => (
                <Space>
                    <img style={{width: 20}} src={option.data.icon} alt={option.data.label}/> {option.data.label}
                </Space>
                )}
            />
            <Button type="primary">Add asset</Button>
        
        </Layout.Header>
    )
}