class App extends React.Component {

    state ={
        description: 'Lets Drink!'
    }


    render(){
        return(
            <h1>{this.state.description}</h1>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector('.container'));