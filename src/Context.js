import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();

//Provider ==> It will provide information through out the application

//Consumer ==> we can consume the data where ever we need

class ProductProvider extends Component {
    state = {
        // products: [...storeProducts],
        products: [],
        detailProduct: detailProduct,
        cart: [],
        // cart: storeProducts,
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    }

    componentDidMount() {
        this.setProducts();
    }

    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];            
        })

        this.setState(()=>{
            return {products: tempProducts}
        })
    }

    // get item based on selection 
    getItem = (id) => {
        const product= this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetail = (id) =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {detailProduct:product}
        });
        console.log(`hello from details from context ${id}`);
    }

    addToCart = (id) => {
        // console.log(`hello from add to cart from context is ${id}`);
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        this.setState(()=>{
            return {products: tempProducts, cart:[...this.state.cart, product]};
        }, ()=>{
            // console.log(this.state);
            this.addTotals();
        })

    }

    openModal = id =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {modalProduct:product, modalOpen: true};
        })
    }

    closeModal = id =>{
        this.setState(()=>{
            return {modalOpen: false};
        })
    }

    increment = (id) => {
        // console.log('this is increment method');
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find( item => item.id === id)
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(
            () => {
                return{cart: [...tempCart]}
            }, () => {
                this.addTotals();
            }
        );
    }

    decrement = (id) => {
        // console.log('this is decrement method')
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find( item => item.id === id)
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count - 1;
        
        if(product.count === 0){
            this.removeItem(id);
        } else {
            product.total = product.count * product.price;
            
            this.setState(
                () => {
                    return{cart: [...tempCart]}
                }, () => {
                    this.addTotals();
                }
            );
        }
    }

    removeItem =(id) => {
        // console.log('this is remove method');
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);
        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct =tempProducts[index];

        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(()=>{
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            }
        }, ()=>{
            this.addTotals();
        })
    }

    clearCart = () => {
        // console.log('this is clear cart method');
        this.setState(()=>{
            return {
                cart: []
            }
        }, ()=> {
            this.setProducts();
            this.addTotals();
        })
    }

    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(()=>{
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }

    // tester = ()=> {
    //     console.log('State Products:', this.state.products[0].inCart);
    //     console.log('Data Products:', storeProducts[0].inCart);

    //     const tempProducts = [...this.state.products];
    //     tempProducts[0].inCart = true;

    //     this.setState(()=>{
    //         return {products:tempProducts}
    //     }, () =>{
    //         console.log('State Products:', this.state.products[0].inCart);
    //         console.log('Data Products:', storeProducts[0].inCart); 
    //     })
    // }

    render() {
        return (
            //// here value is an object
            // <ProductContext.Provider value="hello from context app">  
            <ProductContext.Provider value={{
                //It will access all state info like products and detailProduct in feature add more it will access.
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart  
            }}>
                {/* <button onClick={this.tester}>Test Me</button>  */}
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };