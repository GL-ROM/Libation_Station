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
                            <h3 class="modal-title" id="exampleModalLongTitle">Sign Up Form</h3>
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
            <div className="container mt-3">
                <form onSubmit={this.props.handleLogin}>
                    <div className="form-group">
                        <label htmlFor="logEmail">Email</label>
                        <input id="logEmail" className="form-control" type="text" value={this.props.email} onChange={this.props.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="logPass">Password</label>
                        <input id="logPass" type="password" className="form-control" value={this.props.password} onChange={this.props.handleChange}/>
                    </div>
                    <div>
                        <input className="btn btn-primary" type="submit" value="Login"/>
                    </div>
                </form>
            </div>
        )
    }
}

class Alert extends React.Component {
    render () {
        return (
            <div class="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>{this.props.message}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
        )
    }
}

class CatDropdown extends React.Component {
    render () {
        return (
            <div className="container">
                <form>
                    <div className="form-group">
                        <label for="catSelect">Search Category:</label>
                        <select name="catSelect" id="catSelect" onChange={this.props.handleChange} className="form-control">
                            <option>--Select One--</option>
                            <option value="i">Ingredient</option>
                            <option value="c">Drink Category</option>
                            <option value="g">Glass Type</option>
                        </select>
                    </div>
                </form>
            </div>
        )
    }
}

class CatList extends React.Component {
    
    render () { 
        return (
                <div className="container">
                    <form onSubmit={this.props.handleSubmit}>
                        <div className="form-group">
                            {this.props.catSelect === 'i' ? 
                                <select id="searchFilters" className="form-control" multiple>
                                    {this.props.catList.map((item) => {
                                    for(let x in item) {
                                        return (
                                            <option value={item[x]}>{item[x]}</option>
                                        )
                                    }
                                })}
                                </select> 
                                :
                                <select id="searchFilters" className="form-control">
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
                            <input className="btn btn-primary" type="submit" value="Lets Drink!"/>
                        </div>
                    </form>
                </div>
        )
    }
}

class Form extends React.Component {

    render () {
        return (
            <div className="container pt-3">
                <CatDropdown handleChange={this.props.handleChange}/>
                {/* <Test var={this.state.catSelect}/> */}
                {this.props.state.catChosen === true && <CatList catList={this.props.state.catList} catSelect={this.props.state.catSelect} handleSubmit={this.props.handleSubmit}/>}
            </div>
        )
    }
}


class FavoritesPage extends React.Component {   
    render () {
        return (       
                    <div className="container">
                        <div>
                            <h3>My Drinks</h3>
                        </div>
                            <div className="container over-flow-auto mt-3 vDrink">
                                {
                                    this.props.favorites.map((drinks, index) => {
                                        return(
                                                <div className="card mb-4">
                                                    <div className="row no-gutters" onClick={() => {
                                        this.props.openDrink(drinks.idDrink, drinks)
                                            }
                                        }>
                                                        <div className="col-sm-4">
                                                            <img className="card-img img-fluid rounded" src={drinks.strDrinkThumb}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <div className="card-body">
                                                            <h3>{drinks.strDrink}</h3>
                                                        </div>
                                                    </div>
                                                    <button className="btn btn-primary" id={index} onClick={() => {
                                                        this.props.removeFavorite(index);
                                                    }}>Remove</button>
                                                </div>
                                            )
                                        })
                                    }
                            </div>
                        </div>
        )
    }
}

class DrinksList extends React.Component {

    render () {
        return (
            <div className="container mt-3">
                <button className="btn btn-primary" onClick={() => {this.props.changeViewMode('drinkSearch')}}>New Search</button>
                <div className="container overflow-auto mt-3" id="drinkslist-cont">
                        {this.props.drinks.map((item) => {
                            return (
                                <div className="card mb-4">
                                <div className="row no-gutters" onClick={() => {
                                        this.props.openDrink(item.idDrink, item)
                                            }
                                        }>
                                    <div className="col-sm-4">
                                        <img className="card-img img-fluid rounded" src={`${item.strDrinkThumb}`} alt="Card image cap"/>
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="card-body">
                                            <h3 className="card-title">{item.strDrink}</h3>
                                        </div>
                                    </div>                            
                                </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        )
    }
}

class ViewDrink extends React.Component {

    render () {
        return (
                    <div className="vdrink mt-3 p-2">
                        <div className="row"> 
                            <div className="col-lg-8 vDrink">
                                <div className="backButtonDiv">
                                    <button className="backButton btn btn-primary" onClick={() => {this.props.changeViewMode('viewList')}}>Back</button>
                                </div>
                                <h1 className="mt-4" className="selectedDrinkId" >{this.props.currentDrink.strDrink}</h1>
                                <div className="currentDrinkImageDiv">
                                    <img className="img-fluid rounded" className="currentDrinkImage" src={this.props.currentDrink.strDrinkThumb}></img>
                                </div>
                                <p className="lead text-justify" className="selectedDrinkId2 vDText" >Category: {this.props.currentDrink.strCategory}</p>
                                <p className="lead text-justify" className="selectedDrinkId2 vDText" >Ingredients: </p>
                                <ol>
                                    <li className="selectedDrinkId2" >{this.props.currentDrink.strIngredient2} {this.props.currentDrink.strMeasure2}</li>
                                    <li className="selectedDrinkId2" >{this.props.currentDrink.strIngredient3} {this.props.currentDrink.strMeasure3}</li>
                                    <li className="selectedDrinkId2" >{this.props.currentDrink.strIngredient4} {this.props.currentDrink.strMeasure4}</li>
                                    <li className="selectedDrinkId2" >{this.props.currentDrink.strIngredient5} {this.props.currentDrink.strMeasure5}</li>
                                    <li className="selectedDrinkId2" >{this.props.currentDrink.strIngredient6} {this.props.currentDrink.strMeasure6}</li>
                                </ol>
                                <div className="favoritesButtonDiv">
                                    <button className="favoritesButton btn btn-primary" onClick={() => {
                                        this.props.addingFavorites(this.props.currentDrink.idDrink)
                                    }} >Add to Favorites</button>
                                </div>
                            </div>
                        </div>
                    </div>
        )
    }
}

class Carousel extends React.Component {

    componentDidMount() {
        this.props.getCarouselDrinks()
    }

    render() {
        return (
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        {this.props.carouselDrinks.map((item, index) => {

                            if(index === 0) {
                                return (
                                    <div className="carousel-item active">
                                        <img className="d-block w-100 cImage" src={item.strDrinkThumb} onClick={() => {
                                            this.props.openDrink(item.idDrink)
                                        }}/>
                                    </div>
                                )
                            }
                            return (
                                <div className="carousel-item">
                                    <img className="d-block w-100" src={item.strDrinkThumb} onClick={() => {
                                            this.props.openDrink(item.idDrink)
                                        }}/>
                                </div>
                            )
                        })}
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
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#" onClick={() => {
                        this.props.changeViewMode('drinkSearch')
                    }}><h3>Libation Station</h3></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav">
                            
                            {!this.props.state.userActive && 
                                <li class="nav-item">
                                    <a className="nav-link" data-toggle="modal" data-target="#sign-up-form-centered">Sign Up</a>
                                </li>
                            }
                            {this.props.state.userActive &&
                                <div>
                                    <li className="nav-item" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                                        <a className="nav-link" onClick={() => {
                                        this.props.changeViewMode('viewFavs');
                                        }}>My Drinks</a>
                                    </li>
                                    <li className="nav-item" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                                    <a className="nav-link" onClick={() => {
                                        this.props.changeViewMode('addDrink')
                                    }}>Add A Drink</a> 
                                </li>
                                </div>
                            }
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation" onClick={() => {
                                    this.props.state.userActive ? this.props.logout() : this.props.changeViewMode('login')
                                }}>{this.props.state.userActive ? 'Logout' : 'Login'}</a>
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
                <div className="container">
                    <h3>Add Your Drink</h3>
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
                                <input className="btn btn-primary" type="submit" value="Add"/>
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
        currMeasure: '',
        carouselDrinks: [],
        randomDrinksUrl: "https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php",
        currUserID: '',
        userActive: false,
        drinks: []
    }

    changeViewMode = (mode) => {
        this.setState({viewMode: mode})
    }

    openDrink = (drinkId, drink, event) => {
        if(drinkId.length > 6) {
            this.setState({currentDrink: drink, viewMode: 'viewDrink'})
        }
        fetch(this.state.drinkIdURL + drinkId)
        .then(resp => resp.json())
        .then(json => this.setState({currentDrink: json.drinks[0]}, () => {
            this.changeViewMode('viewDrink');
        }))
    }

    addToFavorites = () => {
        fetch(`/drinks/${this.state.currUserID}/add`, {
            body: JSON.stringify(this.state.currentDrink),
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(json => {
            this.setState({
                favorites: [...this.state.favorites, this.state.currentDrink]
            }, () => {console.log('woohoo', this.state.favorites)})
        })
    }

    removeFavorite = (index) => {
        fetch(`/drinks/${this.state.currUserID}/delete`, {
            body: JSON.stringify(this.state.currentDrink.idDrink),
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => {
            this.setState({
                favorites: [
                    ...this.state.favorites.slice(0, index),
                    ...this.state.favorites.slice(index + 1)
                ]
            })
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
            console.log('filterstr', filterStr)
            fetch(this.state.filterUrl + this.state.catSelect + '=' + filterStr)
                .then(resp => resp.json())
                .then((apiDrinks) => {
                    fetch(`/drinks/${this.state.catSelect}/${selected}`)
                    .then(resp => resp.json())
                    .then(userDrinks => this.setState({
                        drinks: [
                            ...userDrinks,
                            ...apiDrinks.drinks
                        ],
                        viewMode: 'viewList'
                    }, () => {
                        console.log('state of drinks', this.state.drinks)
                    }))
                })
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
        if(this.state.strDrinkThumb === '') {
            this.setState({strDrinkThumb: "./css/img/kindpng_800934.png"}, () => {
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
                        creator: this.state.currUserID
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
            })
        }
        }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }

    handleLogin = (event) => {
        event.preventDefault();
        console.log("Handle Login Ran");
        console.log(logEmail.value);
        console.log(logPass.value);
        fetch("/drinks/login", {
            body: JSON.stringify({
                email: logEmail.value,
                password: logPass.value
        }),
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
        }).then(resp => resp.json())
        .then((json1) => {
            console.log('this', json1)
            this.setState({
                userActive: true,
                currUserID: json1._id,
                viewMode: 'drinkSearch',
                favorites: json1.favorites
            })
        })
        .catch(error => {
            <Alert message="Sorry, invalid email or password."/>
        })
    }

    logout = () => {
        this.setState({
            currUserID: '',
            favorites: [],
            viewMode: 'drinkSearch',
            userActive: false
        })
    }

    getCarouselDrinks = () => {
        fetch(this.state.randomDrinksUrl)
        .then(resp => resp.json())
        .then(json => this.setState({
            carouselDrinks: json.drinks
        }, () => {
            console.log(this.state.carouselDrinks, this.state.carouselDrinks[0])
        }))
    }

    renderViewMode = () => {
        switch(this.state.viewMode) {
            case 'drinkSearch':
                return <Form handleChange={this.handleCatSel} handleSubmit={this.getDrinks} state={this.state} openDrink={this.openDrink}/>;
                break;
            case 'viewDrink':
                return <ViewDrink currentDrink={this.state.currentDrink} changeViewMode={this.changeViewMode} addingFavorites={this.addToFavorites}/>;
                break;
            case 'addDrink':
                return <AddDrink state={this.state} handleChange={this.handleChange} handleSubmit={this.addIngredient} addDrink={this.addDrink}/>;
                break;
            case 'viewFavs':
                return <FavoritesPage props={this.state.currentDrink} favorites={this.state.favorites} openFavorites={this.state.openFavorites} removeFavorite={this.removeFavorite} openDrink={this.openDrink}/>;
                break;
            case 'login':
                return <LoginForm state={this.state} handleChange={this.handleChange} handleLogin={this.handleLogin} changeViewMode={this.changeViewMode}/>
                break;
            case 'viewList':
                return <DrinksList drinks={this.state.drinks} openDrink={this.openDrink} changeViewMode={this.changeViewMode}/>;
                break;
        }
    }

    render(){
        return(
            <div>
                <Carousel getCarouselDrinks={this.getCarouselDrinks} carouselDrinks={this.state.carouselDrinks} openDrink={this.openDrink}/>
                <Header changeViewMode={this.changeViewMode} state={this.state} logout={this.logout}/>
                {this.renderViewMode()}
                <SignUpForm />

            </div>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector('.cont'));