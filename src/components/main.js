import React, { Component } from 'react';
import Add from './add/add_product';
import Dashboard from './dashboard/dashboard';
import './main.css';
import axios from 'axios';

class Main extends Component {
    constructor(props){
        super(props);

        this.state = {
            pPrice: 0,
            pName: '',
            pImgUrl: '',
            imageCheck: 'https://www.lauriloewenberg.com/wp-content/uploads/2019/04/No_Image_Available.jpg',
            inventoryList: []
        }

        this.updatePrice = this.updatePrice.bind( this )
        this.updateName = this.updateName.bind( this )
        this.updateImgUrl = this.updateImgUrl.bind( this )
        this.reset = this.reset.bind( this )
        this.componentDidMount = this.componentDidMount.bind( this )
    }

    componentDidMount(){
        axios.get('/api/inventory/').then( results => {
            this.setState({
                inventoryList: results.data
            })
        })
        
    }

    updatePrice(val){
        this.setState({
            pPrice: val
        })
    }

    updateName(val){
        this.setState({
            pName: val
        })
    }

    updateImgUrl(val){
        this.setState({
            pImgUrl: val
        })
    }

    reset(){
        this.setState({
            pPrice: 0,
            pName: '',
            pImgUrl: '',
            imageCheck: ''
        })
    }


    render(){
        return(
            <div className='mainDiv'>
                <div className='dashboardDiv'>
                    <Dashboard inventory={ this.state.inventoryList } />
                </div>
                <div className='addBoxDiv'>
                    <div className='addBox'>
                    <Add reset={this.reset} nameVal={ this.state.pName } priceVal={ this.state.pPrice } UrlVal={ this.state.pImgUrl } imageCheck={ this.state.imageCheck } updatePrice={this.updatePrice} updateName={this.updateName} updateImgUrl={this.updateImgUrl} />

                    </div>
                </div>
                
            </div>
        )
    }
}

export default Main