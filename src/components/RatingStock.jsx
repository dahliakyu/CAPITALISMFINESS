import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines,  MarkSeries, ChartLabel} from 'react-vis';
import 'react-vis/dist/style.css';
import './Chart.css';

function RatingStock (props) {

  const stat1 = props.data.map((product) => {
      return {
        x: product.rating,
        value: product.stock,
        style:{stroke: 'black'},
        size: product.stock
      }
    })
    
    return (
      <XYPlot width={500} height={500} getY={d => d.value}>
      <XAxis title = 'Rating'/>
      <YAxis title = 'Stock'/>
      <MarkSeries
        className="mark-series-example"
        customComponent="circle"
        data={stat1}
      />
    </XYPlot>
    );
  }

  export default RatingStock