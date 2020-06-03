class SignUpForm extends React.Component {
    state = {
        email: '',
        password: '',
        name: '',
        dob: ''
    }
    
    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        fetch('/users', {
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                dob: this.state.dob
            }),
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              }
        }).then(response => response.json())
            .then(newUser => {
                console.log(newUser);
            })
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-field">
                    <label htmlFor="email">Email: </label>
                    <input id="email" type="email" value={this.state.email} onChange={this.handleChange}></input>
                </div>
                <div className="form-field">
                    <label htmlFor="password">Password: </label>
                    <input id="password" type="password" value={this.state.password} onChange={this.handleChange}></input>
                </div>
                <div className="form-field">
                    <label htmlFor="name">Name: </label>
                    <input id="name" type="text" value={this.state.name} onChange={this.handleChange}></input>
                </div>
                <div className="form-field">
                    <label htmlFor="dob">DOB: </label>
                    <input id="dob" type="date" value={this.state.dob} onChange={this.handleChange}></input> 
                </div>
                <input type="submit" />                 
            </form>
        )
    }
}

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
        .then(json => this.setState({
            drinks: json.drinks,
            ingredient: ''
        })
        )
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
                {this.state.drinks && <DrinksList drinks={this.state.drinks}/>}
            </div>
        )
    }
}

class DrinksList extends React.Component {
    render () {
        return (
            <div>
                <ul>
                    {this.props.drinks.map((item) => {
                        return (
                            <li>
                                <img src={`${item.strDrinkThumb}/preview`}/>
                                <h4>{item.strDrink}</h4>
                            </li>
                        )
                    })}
                </ul>
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
                <SignUpForm state={this.state}/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector('.cont'));