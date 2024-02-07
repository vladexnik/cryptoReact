import {Layout, Typography} from "antd";
import CryptoContext from "../../context/cryptoContext";
import { useContext } from "react";
import Graphic from "./Graphic";
import AssetsTable from "./AssetsTable";


const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    lineHeight: '120px',
    color: '',
    backgroundColor: '#001529',
    padding: '1rem'
};

export default function AppContent(){

    const {assets, crypto}=useContext(CryptoContext);


    return(
        <Layout.Content style={contentStyle}>
            <Typography.Title 
                level={3} 
                style={{textAlign: 'left', color:'#fff'}}
            >
            Portfolio : {assets.map(asset=>{
                const coin=crypto.find((c)=> c.id===asset.id);
                return asset.amount*coin.price
            })
            .reduce((acc, v)=> (acc+=v) ,0).toFixed(2) } $
            </Typography.Title>
            <Graphic/>
            <AssetsTable/>
        </Layout.Content>
    )
}