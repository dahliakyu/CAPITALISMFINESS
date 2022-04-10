import './Stats.css'

function Stats(props){
    const Prices = props.data.reduce((product, obj) => {
        product.push(obj.price);
        return product;
        }, []);
    const Discounts = props.data.reduce((product, obj) => {
        product.push(obj.discountPercentage);
        return product;
        }, []);
    const Ratings = props.data.reduce((product, obj) => {
        product.push(obj.rating);
        return product;
        }, []);
    function getAverage (array) {
        const n = array.length;
        const mean = array.reduce((a, b) => a + b) / n;
        return mean.toFixed(2);
    }
    function getStandardDeviation (array) {
        const n = array.length;
        const mean = array.reduce((a, b) => a + b) / n;
        const std = Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
        return std.toFixed(2);
      }
    const priceStats = {
        minPrice : Math.min(...Prices),
        maxPrice : Math.max(...Prices),
        averagePrice : getAverage(Prices),
        stdPrice: getStandardDeviation(Prices)
    }
    const ratingStats = {
        minRating : Math.min(...Ratings),
        maxRating : Math.max(...Ratings),
        averageRating : getAverage(Ratings),
        stdRating: getStandardDeviation(Ratings)
    }
    const discountStats = {
        minDiscount : Math.min(...Discounts),
        maxDiscount : Math.max(...Discounts),
        averageDiscount : getAverage(Discounts),
        stdDiscount: getStandardDeviation(Discounts)
    }

    return <>
        <div>
            Our product's prices range from £{priceStats.minPrice} to £{priceStats.maxPrice}, with an average price of £{priceStats.averagePrice} and an insanely high standard deviation of £{priceStats.stdPrice}! All the products have ratings of more than {ratingStats.minRating} with an average rating of {ratingStats.averageRating}, high quality items only! So what are you waiting for XDXDXD
        </div>
        
    </>;
}

export default Stats

