import { XYPlot, XAxis, YAxis, MarkSeries} from 'react-vis';
import 'react-vis/dist/style.css';
import './Chart.css';

function DiscountPrices (props) {

  const stat2 = props.data.map((product) => {
      return {
        x: product.discountPercentage,
        value: product.price,
        style:{stroke: 'black'},
        size: product.price
      }
    })
    
    return (
      <XYPlot width={500} height={500} getY={d => d.value}>
      <XAxis title = 'Discount'/>
      <YAxis title = 'Price'/>
      <MarkSeries
        className="mark-series-example"
        customComponent="circle"
        data={stat2}
      />
    </XYPlot>
    );
  }

  export default DiscountPrices