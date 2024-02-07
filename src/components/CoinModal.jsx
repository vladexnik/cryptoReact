import {Typography, Tag, Divider} from 'antd';
import CoinInfo from './CoinInfo';

export default function CoinModal({coin}){
    console.log(coin);
    return (
        <>
            <CoinInfo coin={coin} withSymbol/>
            <Divider/>
            <Typography.Paragraph>
                <Typography.Text strong style={{marginRight: 5}}>1 hour:</Typography.Text>
                <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>
                {coin.priceChange1h}%</Tag>

                <Typography.Text strong style={{marginRight: 5}}>1 day:</Typography.Text>
                <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>
                {coin.priceChange1d}%</Tag>

                <Typography.Text strong style={{marginRight: 5}}>1 week:</Typography.Text>
                <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>
                {coin.priceChange1w}%</Tag>
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text strong style={{marginRight: 5, fontSize: 20}}>Price: </Typography.Text>
                {coin.price.toFixed(2)}$
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text strong style={{marginRight: 5, fontSize: 20}}>Price BTC: </Typography.Text>
                {coin.priceBtc}
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text strong style={{marginRight: 5, fontSize: 20}}>Market Cap: </Typography.Text>
                {coin.marketCap.toFixed(2)}
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text strong style={{marginRight: 5, fontSize: 20}}>ContractAdress: </Typography.Text>
                {coin.contractAddress}
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text strong style={{marginRight: 5, fontSize: 20}}>Website: </Typography.Text>
                <a href={coin.websiteUrl} alt={coin.websiteUrl} target="_blank">{coin.websiteUrl}</a>
            </Typography.Paragraph>
            
        </>
    )
}