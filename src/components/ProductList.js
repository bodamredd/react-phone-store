import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';
// import {storeProducts} from '../data';
import { ProductConsumer } from '../Context';

export default class ProductList extends Component {
    // state={
    //     products: storeProducts
    // }
    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="Our" title="Products"/>
                        <div className="row">
                            <ProductConsumer>
                            {value=>{
                                    return value.products.map(product => {
                                        // return <Product key={product.id} product={product} handleDetail={value.handleDetail} addToCart={value.addToCart}/>
                                        return <Product key={product.id} product={product}/>;
                                    })
                                }}
                                {/* {(hello)=>{
                                    return <h1>{hello}</h1>
                                }} */}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
