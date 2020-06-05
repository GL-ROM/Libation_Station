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
            <div class="modal fade" id="sign-up-form-centered" tabindex="-1" role="form" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Sign Up Form</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form className="sign-up-form" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email: </label>
                                    <input className="form-control" id="email" type="email" value={this.state.email} onChange={this.handleChange}></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password: </label>
                                    <input className="form-control" id="password" type="password" value={this.state.password} onChange={this.handleChange}></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Name: </label>
                                    <input className="form-control" id="name" type="text" value={this.state.name} onChange={this.handleChange}></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dob">DOB: </label>
                                    <input className="form-control" id="dob" type="date" value={this.state.dob} onChange={this.handleChange}></input> 
                                </div>
                                <div class="modal-footer">
                                    <input class="btn btn-primary" type="submit" /> 
                                </div>                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class LoginForm extends React.Component {
    render () {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="logEmail">Email</label>
                        <input id="logEmail" className="form-control" type="text" value={this.props.state.logEmail} onChange={this.props.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="logPass">Password</label>
                        <input id="logPass" className="form-control" type="text" value={this.props.state.logPass} onChange={this.props.handleChange}/>
                    </div>
                    <div>
                        <input type="submit" value="login"/>
                    </div>
                </form>
            </div>
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

    render () {
        return (
            <div>
                <CatDropdown handleChange={this.props.handleChange}/>
                {/* <Test var={this.state.catSelect}/> */}
                {this.props.state.catChosen === true && <CatList catList={this.props.state.catList} catSelect={this.props.state.catSelect} handleSubmit={this.props.handleSubmit}/>}
                {this.props.state.drinks && <DrinksList drinks={this.props.state.drinks} openDrink={this.props.openDrink}/>}
            </div>
        )
    }
}


class FavoritesPage extends React.Component { 

    

    deleteFromFavorites = (event) => {
        console.log(event.currentTarget.id);
        var target = event.currentTarget.id;
        var remove = this.props.favorites.splice(target, 1);
        this.setState({
            favorites: remove
        })
    }

    

    render () {
        return (       
            <div class="modal fade" id="favoritesPage" tabindex="-1" role="form" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Favorites</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div>
                                {this.props.openFavorites &&
                                    <div>
                                    {
                                    this.props.favorites.map((drinks, index) => {
                                        return(
                                            <li>
                                                <div>{drinks.strDrink}</div>
                                                <div>
                                                <button id={index} onClick={this.deleteFromFavorites}>Remove</button>
                                                </div>
                                            </li>
                                        )
                                    })
                                    }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
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
                            <div>
                                <div id={item.idDrink} onClick={() => {
                                            this.props.openDrink(item.idDrink)
                                        }
                                    }>
                                    <li>
                                        <img src={`${item.strDrinkThumb}/preview`}/>
                                        <h4>{item.strDrink}</h4>
                                    </li>
                                </div>
                            </div>                            
                        )
                    })}
                </ul>
            </div>
        )
    }
}

class ViewDrink extends React.Component {
    render () {
        return (
                    <div>
                        <button onClick={() => {this.props.changeViewMode('drinkSearch')}}>Back</button>
                        <h1 className="selectedDrinkId" >Drink: {this.props.currentDrink.strDrink}</h1>
                        <div className="currentDrinkImageDiv">
                            <img className="currentDrinkImage" src={this.props.currentDrink.strDrinkThumb}></img>
                        </div>
                        <h1 className="selectedDrinkId" >Category: {this.props.currentDrink.strCategory}</h1>
                        <h1 className="selectedDrinkId" >Ingredients: {this.props.currentDrink.strIngredient1}</h1>
                        <h1 className="selectedDrinkId" >{this.props.currentDrink.strIngredient2}</h1>
                        <h1 className="selectedDrinkId" >{this.props.currentDrink.strIngredient3}</h1>
                        <h1 className="selectedDrinkId" >{this.props.currentDrink.strIngredient4}</h1>
                        <h1 className="selectedDrinkId" >{this.props.currentDrink.strIngredient5}</h1>
                        <h1 className="selectedDrinkId" >{this.props.currentDrink.strIngredient6}</h1>
                        <button onClick={this.props.addingFavorites} >Add to Favorites</button>
                    </div>
        )
    }
}

class Carousel extends React.Component {
    render() {
        return (
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img className="d-block w-100" src="https://www.tasteofhome.com/wp-content/uploads/2018/01/Passion-Fruit-Hurricanes_EXPS_JMZ18_37571_C03_14_8b-1.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&h=500"  alt="First slide"/>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100" src="https://www.lidl-recipes.ie/var/lidl-recipes/storage/images/lidl-recipes.ie/recipes/peach-passionfruit-and-mint-mojito/2861909-1-eng-IE/Peach-Passionfruit-And-Mint-Mojito_image1200x630.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&h=500"  alt="Second slide"/>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100" src="https://i2.wp.com/theshortordercook.com/wp-content/uploads/2020/05/thumbnail_IMG_7171.jpg?resize=1200%2C550&ssl=1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&h=500"  alt="Third slide"/>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100" src="https://www.lidl-recipes.ie/var/lidl-recipes/storage/images/lidl-recipes.ie/recipes/peach-passionfruit-and-mint-mojito/2861909-1-eng-IE/Peach-Passionfruit-And-Mint-Mojito_image1200x630.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&h=500"  alt="Third slide"/>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
                </div>
        )
    }
}

class Header extends React.Component {  
    render () {
        return (
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Libation Station</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Login</a>
                            </li>
                            <li class="nav-item">
                                <a className="nav-link" data-toggle="modal" data-target="#sign-up-form-centered">Sign Up</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="modal" data-target="#favoritesPage">Favorites</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => {
                                    this.props.changeViewMode('addDrink')
                                }}>Add A Drink</a> 
                            </li>
                        </ul>
                    </div>
                </nav>   
        )
    }
}

class AddDrink extends React.Component {

    render () {
        return (
                <div>
                    <h3>Add Your Drink!</h3>
                        <form onSubmit={this.props.addDrink}>
                            <div className="form-group">
                                <label htmlFor="strDrink">Name</label>
                                <input id="strDrink" className="form-control" type="text" value={this.props.state.strDrink} onChange={this.props.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="strCategory">Category</label>
                                <input id="strCategory" className="form-control" type="text" value={this.props.state.strCategory} onChange={this.props.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="strAlcoholic">Alcoholic?</label>
                                <select id="strAlcoholic" className="form-control" type="text">
                                    <option value="alcoholic">Yes</option>
                                    <option valute="non-alcoholic">No</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="strGlass">Glass</label>
                                <input id="strGlass" className="form-control" type="text" value={this.props.state.strGlass} onChange={this.props.handleChange}/>
                            </div>
                            <div>
                                <IngredientLister state={this.props.state} handleChange={this.props.handleChange} handleSubmit={this.props.handleSubmit}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="strInstructions">Instructions</label>
                                <textarea id="strInstructions" className="form-control" type="text" value={this.props.state.strInstructions} onChange={this.props.handleChange}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="strDrinkThumb">Image</label>
                                <input id="strDrinkThumb" className="form-control" type="text" value={this.props.state.strDrinkThumb} onChange={this.props.handleChange}/>
                            </div>
                            
                            <div>
                                <input type="submit" value="Add"/>
                            </div>
                        </form>
                </div>
        )
    }
}

class IngredientLister extends React.Component {
    render () {
        return (
            <div>
                <div>
                    <div>
                        {/* preview screen */}
                        <ol>
                            {this.props.state.strMeasure.map((item, index) => {
                                return (
                                    <li>
                                        {item} {this.props.state.strIngredient[index]}
                                    </li>
                                )
                            })}
                        </ol>
                    </div>
                    <div>
                        <form>
                            <div>
                                <label htmlFor="currMeasure">Measurement</label>
                                <input id="currMeasure" type="text" value={this.props.state.currMeasure} onChange={this.props.handleChange}/>
                            </div>
                            <div>
                                <label htmlFor="currIngredient">Ingredient</label>
                                <input id="currIngredient" type="text" value={this.props.state.currIngredient} onChange={this.props.handleChange}/>
                            </div>
                            <div onClick={this.props.handleSubmit}>
                                {/* <input type="submit" value="Add"/> */}
                                ADD
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

class App extends React.Component {

    state ={
        openFavorites: false,
        favorites: [],
        viewMode: 'drinkSearch',
        currentDrink: '',
        drinkIdURL: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=',
        searchFilters: [],
        filterUrl: "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?",
        listUrl: "https://www.thecocktaildb.com/api/json/v2/9973533/list.php?",
        catChosen: false,
        catSelect: 'notchanged',
        catList: [],
        strDrink: '',
        strCategory: '',
        strAlcoholic: '',
        strGlass: '',
        strInstructions: '',
        strDrinkThumb: '',
        strIngredient: [],
        strMeasure: [],
        currIngredient: '',
        currMeasure: ''
    }

    changeViewMode = (mode) => {
        this.setState({viewMode: mode})
    }

    openDrink = (drinkId, event) => {
        fetch(this.state.drinkIdURL + drinkId)
        .then(resp => resp.json())
        .then(json => this.setState({currentDrink: json.drinks[0]}))
        this.changeViewMode('viewDrink');
    }

    addToFavorites = () => {
        console.log(this.state.favorites);
        var joined = this.state.favorites.concat(this.state.currentDrink);
        this.setState({ 
            openFavorites: true,
            favorites: joined 
        })
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

    getDrinks = (event) => {
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

    addIngredient = (event) => {
        event.preventDefault();
        this.setState({
            strMeasure: [...this.state.strMeasure, this.state.currMeasure],
            strIngredient: [...this.state.strIngredient, this.state.currIngredient],
            currMeasure: '',
            currIngredient: ''
        }, () => {
            console.log(this.state.strMeasure)
        })

    }

    addDrink = (event) => {
        event.preventDefault();
        console.log('add drink ran')
        fetch('/drinks', {
            body: JSON.stringify({
                strDrink: this.state.strDrink,
                strCategory: this.state.strCategory,
                strAlcoholic: this.state.strAlcoholic,
                strGlass: this.state.strGlass,
                strInstructions: this.state.strInstructions,
                strDrinkThumb: this.state.strDrinkThumb,
                strIngredient: this.state.strIngredient,
                strMeasure: this.state.strMeasure,
            }),
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(() => console.log('data sent'))
        .then(this.setState({
            strDrink: '',
                strCategory: '',
                strAlcoholic: '',
                strGlass: '',
                strInstructions: '',
                strDrinkThumb: '',
                strIngredient: [],
                strMeasure: [],
                viewMode: 'drinkSearch'
        }))
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }

    render(){
        return(
            <div>
                <Carousel />
                <Header changeViewMode={this.changeViewMode}/>
                {
                this.state.viewMode === 'drinkSearch' ? 

                <Form handleChange={this.handleCatSel} handleSubmit={this.getDrinks} state={this.state} openDrink={this.openDrink}/> : 
                this.state.viewMode === 'viewDrink' ? <ViewDrink currentDrink={this.state.currentDrink} changeViewMode={this.changeViewMode} addingFavorites={this.addToFavorites}/> :
                this.state.viewMode === 'addDrink' ? <AddDrink state={this.state} handleChange={this.handleChange} handleSubmit={this.addIngredient} addDrink={this.addDrink}/> : ''
                }
                <FavoritesPage props={this.state.currentDrink} favorites={this.state.favorites} openFavorites={this.state.openFavorites} />
                <SignUpForm />

            </div>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector('.cont'));