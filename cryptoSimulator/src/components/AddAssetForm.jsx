import { useContext, useState, useRef } from "react"
import { Select, Space, Divider, Form, Input, InputNumber, Button, DatePicker,Result } from "antd";
import CryptoContext from "../context/cryptoContext";
import CoinInfo from './CoinInfo';
import { nanoid } from "nanoid";

const validateMessages = {
    required: "${label} is required!",
    types:{
        number: '${label} is not valid number'
    },
    number: {
        range: '${label} must be between ${min} and ${max}'
    }
  };


export default function AddAssetForm({onClose}){

    const [form]=Form.useForm(); // for amount field to make total

    const {crypto, dollarScore, setDollarScore, addAsset}=useContext(CryptoContext);

    const [coin,setCoin]=useState(null);
    const [submitted,setSubmitted]=useState(false);
    const assetRef=useRef(); 

    function selectCoin(selected){
         setCoin(crypto.find(coin=> coin.id===selected));    
    }

    if(submitted){
        return (
            <Result
                status="success"
                title="New Asset Added"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
                extra={[    
                    <Button type="primary" key="console1" onClick={onClose}>
                        Close
                    </Button>,
                   
                ]}
            />
        )
    }

    if(!coin){
        return (
        
            <Select
                style={{
                width: '100%',
                }}
                onSelect={(selected)=>selectCoin(selected)}
                placeholder='Select coin'
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
        )
    }

    function onFinish(values){
        const newAsset={
            key: nanoid(),
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date(),            
        }

        assetRef.current=newAsset;
        addAsset(newAsset);
        
        setDollarScore((dollarScore)=> dollarScore-newAsset.amount*newAsset.price);

        setSubmitted(true)
        
    }

    function handleAmountChange(value){
        const price=form.getFieldValue('price');
        form.setFieldsValue({
            total: +(value*price).toFixed(2)+' $'
        })
    }

    function handlePriceChange(value){
        const amount=form.getFieldValue('amount');
        form.setFieldsValue({
            total: +(amount*value).toFixed(2)+ ' $'
        })
    }

    return (        
        <Form
        form={form}
        name="basic"
        labelCol={{
        span: 8,
        }}
        wrapperCol={{
        span: 10,
        }}
        style={{
        maxWidth: 600,
        }}
        initialValues={{ 
            price: coin.price.toFixed(2),
           
        }}
        onFinish={onFinish}
        validateMessages={validateMessages}
        >
            <CoinInfo coin={coin}/>
            <Divider/>

            <Form.Item
                label="Amount"
                name="amount"
                rules={[
                    {
                    required: true,
                    type: 'number',
                    min: 0,
                    },
                ]}
            >
                <InputNumber 
                    placeholder="Enter coin amount" 
                    style={{width: '100%' }} 
                    onChange={handleAmountChange}
                />
            </Form.Item>

            <Form.Item
                label="Price in $"
                name="price"
                
            >
                <InputNumber 
                    onChange={handlePriceChange}
                    style={{width: '100%' }}/>
            </Form.Item>

            <Form.Item
                label="Date and time"
                name="date"
            >
                <DatePicker showtime/>
            </Form.Item>

            <Form.Item
                label="Total"
                name="total"
            >
                <InputNumber style={{width: '100%' }} disabled/>
            </Form.Item>


            <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
            >
            <Button type="primary" htmlType="submit">
                Add asset
            </Button>
            </Form.Item>
        </Form>


    )
}