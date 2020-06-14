import React, { Component } from 'react'
import { ProductConsumer } from '../Context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';

export default class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value)=>{
                    const {id, company, image, info, price, title, inCart} = value.detailProduct;
                    return (
                        <div className="container py-5">
                            {/*title*/}
                            <div className="row">
                                <div className="col-10 m-auto text-center text-slanted text-blue my-5">
                                    <h1>{title}</h1>
                                </div>
                            </div>
                            {/*titleend */}

                            {/*product info*/}

                            <div className="row">
                                <div className="col-10 mx-auto col-md-6 my-3">
                                    <img src={image} alt="Product" className="img-fluid"/>
                                </div>
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h2>Model: {title}</h2>
                                    <h3 className="text-title text-uppercase text-muted mt=3 mb-2">Made by : <span className="text-uppercase">{company}</span></h3>
                                    <h4 className="textt-blue">
                                        <strong>
                                            Price: <span>$</span>{price}
                                        </strong>
                                    </h4>
                                    <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                        Some info about product: &nbsp;
                                        <span className="text-muted lead">
                                            {info}
                                        </span>
                                    </p>

                                    <div className="mt-3">
                                        <Link to="/">
                                            <ButtonContainer>
                                                Back to Products
                                            </ButtonContainer>
                                        </Link>
                                        <ButtonContainer cart disabled={inCart ? true : false} onClick={()=>{
                                            value.addToCart(id);
                                            value.openModal(id);
                                        }}>
                                            {inCart ? 'inCart' : 'Add to Cart'}
                                        </ButtonContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </ProductConsumer>
        )
    }
}
