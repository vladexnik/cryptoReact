import {Layout, Select, Space, Button, Modal, Drawer} from "antd";
import { useContext, useEffect, useState } from "react";
import CryptoContext from "../../context/cryptoContext";
import CoinModal from "../CoinModal";
import AddAssetForm from "../AddAssetForm";



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

    const [modal,setModal]=useState(false);
    const [select,setSelect]=useState(false);
    const [coin, setCoin]=useState(null);
    const [drawer, setDrawer]=useState(false);


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
        setCoin(crypto.find((c)=> c.id===value));
        setModal(true);
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
            <Button type="primary" onClick={()=> setDrawer(true)}>Add asset</Button>
            
            <Modal 
                title="Currency" 
                open={modal} 
                onCancel={()=> setModal(false)}
                footer={null}
            >
                <CoinModal coin={coin}/>
            </Modal>

            <Drawer width={600} title="Add asset" onClose={()=> setDrawer(false)} open={drawer} destroyOnClose>
                <AddAssetForm onClose={()=> setDrawer(false)}/>
            </Drawer>

        
        </Layout.Header>
    )
}