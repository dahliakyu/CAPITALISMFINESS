import { useEffect, useState } from 'react'
import apiClient from '../apiClient';
import ProductList from '../components/ProductList'

function Products() {
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
            <div className="App"> 
                <ProductList data={data} />
            </div>
        </>
    )
}

export default Products