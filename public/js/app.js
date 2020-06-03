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
        
        fetch('/drinks/user', {
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
        }).then(() => {
            console.log('Data was sent');
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

class CatDropdown extends React.Component {
    render () {
        return (
            <div>
                <form>
                    <label for="catSelect">Search Category:</label>
                    <select name="catSelect" id="catSelect" onChange={this.props.handleChange}>
                        <option>--Select One--</option>
                        <option value="i">Ingredient</option>
                        <option value="c">Drink Category</option>
                        <option value="g">Glass Type</option>
                    </select>
                </form>
            </div>
        )
    }
}

class CatList extends React.Component {
    
    render () { 
        return (
                <div>
                    <form onSubmit={this.props.handleSubmit}>
                        <div>
                            {this.props.catSelect === 'i' ? 
                                <select id="searchFilters" multiple>
                                    {this.props.catList.map((item) => {
                                    for(let x in item) {
                                        return (
                                            <option value={item[x]}>{item[x]}</option>
                                        )
                                    }
                                })}
                                </select> 
                                :
                                <select id="searchFilters">
                                    {this.props.catList.map((item) => {
                                    for(let x in item) {
                                        return (
                                            <option value={item[x]}>{item[x]}</option>
                                        )
                                    }
                                })}
                                </select>}
                        </div>
                        <div>
                            <input type="submit" value="Lets Drink!"/>
                        </div>
                    </form>
                </div>
        )
    }
}

class Form extends React.Component {

    state = {
        searchFilters: [],
        filterUrl: "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?",
        listUrl: "https://www.thecocktaildb.com/api/json/v2/9973533/list.php?",
        catChosen: false,
        catSelect: 'notchanged',
        catList: []
    }

    handleCatSel = (event) => {
        this.setState({catChosen: true})
        let e = document.getElementById('catSelect');
        let selVal = e.options[e.selectedIndex].value;
        this.setState({catSelect: selVal}, () => {
            this.getCatList();
        });
    }

    getCatList = () => {
        fetch(this.state.listUrl + this.state.catSelect + '=list')
        .then(resp => resp.json())
        .then(json => this.setState({
            catList: json.drinks
        }))
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let elem = document.getElementById('searchFilters');
        let selected = [...elem.options]
            .filter(option => option.selected)
            .map(option => option.value)
        this.setState({searchFilters: selected}, () => {
            let filterStr = this.state.searchFilters.toString();
            fetch(this.state.filterUrl + this.state.catSelect + '=' + filterStr)
                .then(resp => resp.json())
                .then(json => this.setState({drinks: json.drinks}))
        })
    }

    render () {
        return (
            <div>
                <CatDropdown handleChange={this.handleCatSel}/>
                {/* <Test var={this.state.catSelect}/> */}
                {this.state.catChosen === true && <CatList catList={this.state.catList} catSelect={this.state.catSelect} handleSubmit={this.handleSubmit}/>}
                {this.state.drinks && <DrinksList drinks={this.state.drinks}/>}
            </div>
        )
    }
}

class Test extends React.Component {

    render () {
        return (
            <h1>{this.props.var}</h1>
        )
    }
}

class DrinksList extends React.Component {

    state = {
        isOpen: false,
        currentDrinkId: '',
        currentDrinkURL: '',
        drinkIdURL: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=',
        currentDrink: ''

    }

    openDrink = (event) => {

        if(this.state.isOpen){
            this.setState({
                isOpen:false
            })
            }else{
            event.preventDefault();
            this.setState({
                isOpen:true,
                currentDrinkId: event.currentTarget.id,
                currentDrinkURL: this.state.drinkIdURL + event.currentTarget.id
            }, () => {
                fetch(this.state.currentDrinkURL).then((response) => {
                        return response.json();
                    }
                ).then((data)=> {
                    this.setState({
                        currentDrink: data
                    })
                }, err => console.log(err))
            })
        }
    }

    render () {
        return (
            <div>
                <ul>
                    {this.state.isOpen &&
                        <div id="modal">
                            <div id="modal-textbox">
                                {this.state.currentDrink &&
                                <div>
                                    <button onClick={this.openDrink}>X</button>
                                    <h1 className="selectedDrinkId" >Drink: {this.state.currentDrink.drinks[0].strDrink}</h1>
                                    <div className="currentDrinkImageDiv">
                                        <img className="currentDrinkImage" src={this.state.currentDrink.drinks[0].strDrinkThumb}></img>
                                    </div>
                                    <h1 className="selectedDrinkId" >Category: {this.state.currentDrink.drinks[0].strCategory}</h1>
                                    <h1 className="selectedDrinkId" >Ingredients: {this.state.currentDrink.drinks[0].strIngredient1}</h1>
                                    <h1 className="selectedDrinkId" >{this.state.currentDrink.drinks[0].strIngredient2}</h1>
                                    <h1 className="selectedDrinkId" >{this.state.currentDrink.drinks[0].strIngredient3}</h1>
                                    <h1 className="selectedDrinkId" >{this.state.currentDrink.drinks[0].strIngredient4}</h1>
                                    <h1 className="selectedDrinkId" >{this.state.currentDrink.drinks[0].strIngredient5}</h1>
                                    <h1 className="selectedDrinkId" >{this.state.currentDrink.drinks[0].strIngredient6}</h1>
                                </div>
                                }
                            </div>
                        </div>
                    }
                    {this.props.drinks.map((item) => {
                        return (
                            <div>
                                <button id={item.idDrink} value={this.state.currentDrinkId} onClick={this.openDrink}><li>
                                    <img src={`${item.strDrinkThumb}/preview`}/>
                                    <h4>{item.strDrink}</h4>
                                </li></button>
                                
                            </div>
                            
                        )
                    })}
                </ul>
            </div>
        )
    }
}

class Header extends React.Component {
    render () {
        return (
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">Libation Station</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="#">Login</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Sign Up</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Favorites</a>
                            </li>
                        </ul>
                    </div>
                </nav>
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
                <Header />
                <Form />
                <SignUpForm state={this.state}/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector('.cont'));