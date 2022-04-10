import { useEffect, useState } from 'react'
import apiClient from '../apiClient';
import DiscountPrices from '../components/DiscountPrices';
import RatingStock from '../components/RatingStock'
import Stats from '../components/Stats';

function Data() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const res = await apiClient.get();
                console.log(res.data);
                setData(res.data.products)
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        getData()
    }, []);

    if (loading) {
        return <>
            <h1>Load loading loaded :D</h1>
        </>
    }

    return (
        <>
            <div className="Stats-body"><Stats data={data} /></div>
            <div className='Chart-intro'>Here are some graphs for you to appreciate data!!!</div>
            <div className='Chart-body'><RatingStock data={data} /></div>
            <div className='Chart-body'><DiscountPrices data={data} /></div>
        </>
    )
}

export default Data