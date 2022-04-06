import React, {Component, useState, useEffect}  from 'react';
import axios from 'axios';
import './Products.css';
import apiClient from "./http-common";
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';

//for statistics
function Average(){
  const [Prices, setPrices] = useState({});
  useEffect(()=>{
    apiClient.get().then((res)=>setPrices(res.data.products.price));
  }, []);
  const totalPrices = () => {
    return Object.values(parseInt(Prices)).reduce((total, value) => total + value, 0)
  }
  
  return (<div>{totalPrices()}</div>)
}

//for graphs
const Chart = (props) =>{

  const dataArr = props.apiClient.get().then(res => res.data.products.map(product => {
    return{x:product.id,
          y:product.price}
  }));

    return (
      <XYPlot
          xType="ordinal"
          width={1000}
          height={500}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title="Product by id" />
          <YAxis title="prices" />
              <LineSeries
                  data={dataArr}
                  style={{stroke: 'violet', strokeWidth: 3}}/>
      </XYPlot>
);
}


class ProductList extends Component{
  state = {
    product: []
  }
  //function to read and display all the data
  GetAllData(){
    apiClient.get().then(res => res.data.products.map(product =>({
      image: `${product.thumbnail}`,
      title: `${product.title}`,
      id: `${product.id}`,
      description: `${product.description}`,
      price: `${product.price}`,
      stock: `${product.stock}`,
        }))
    )
    .then(product => {this.setState({
      product,
      isLoading: false
    });
  })
  .catch(error => this.setState({error, isLoading: false }))
  }


  componentDidMount(){
    this.GetAllData();
    
  } 
  
  
  render() {
  const { isLoading, product } = this.state;
  return (
    <React.Fragment>
      <div className='App'>
      <h1 className='text-title'> Have a Look at our fine selections, yes yes!</h1>
        {!isLoading ? (
          product.map(product => {
            const { image, title, id, description, price, stock } = product;
            return (
              <article key={id}>
              <img src={image} alt={title}></img>
              <div className='Product-title'>{title}</div>
              <div className='Product-description'>{description}</div>
              <div className='Product-price'>now only £{price}</div>
              <div className='Product-stock'> We have {stock} of them left!</div>
              </article>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </React.Fragment>
  );
}
}

export default ProductList;
