class Form extends React.Component {

    state = {
        ingredient: '',
        ingSearchUrl: "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=",
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(this.state.ingSearchUrl + this.state.ingredient)
        .then((response) => {
            return response.json()
        })
        .then(json => console.log(json))
    }

    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="ingredient">Ingr: </label>
                        <input onChange={this.handleChange} type="text" id="ingredient" name="ingredient" value={this.state.ingredient}/>
                    </div>
                    <div>
                        <input type="submit" value="search"/>
                    </div>
                </form>
            </div>
        )
    }
}

class App extends React.Component {

    state ={
        description: 'Lets Drink!'
    }

    render(){
        return(
            <div>
                <h1>{this.state.description}</h1>
                <Form state={this.state}/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector('.cont'));