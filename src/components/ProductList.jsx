import './ProductList.css'

function ProductList(props) {
        return <>
            <h2 className='Text-title'>
                Have a look at our fine selections, yes yes!
            </h2>
                {
                    props.data.map((product) =>
                        {
                            return (
                                    <ul key={product.id}>
                                    <img src={product.thumbnail} alt={product.title}></img>
                                    <div className='Product-title'>{product.title}</div>
                                    <div className='Product-description'>{product.description}</div>
                                    <div className='Product-price'>now only £{product.price}</div>
                                    <div className='Product-stock'> We have {product.stock} of them left!</div>
                                    </ul>
                            )
                        }
                    )
                }
        </>
    }

export default ProductList
