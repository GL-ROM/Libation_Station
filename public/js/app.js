
class CatDropdown extends React.Component {
    render () {
        return (
            <div>
                <form>
                    <label for="catSelect">Search Category:</label>
                    <select name="catSelect" id="catSelect" onChange={this.props.handleChange}>
                        <option>--Select One--</option>
                        <option value="i=list">Ingredient</option>
                        <option value="c=list">Drink Category</option>
                        <option value="g=list">Glass Type</option>
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
                <form>
                    <div>
                        <select multiple>
                            {this.props.catList.map((item) => {
                                for(let x in item) {
                                    return (
                                        <option>{item[x]}</option>
                                    )
                                }
                            })}
                        </select>
                    </div>
                </form>
            </div>
        )
    }
}

class Form extends React.Component {

    state = {
        ingredient: '',
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
        fetch(this.state.listUrl + this.state.catSelect)
        .then(resp => resp.json())
        .then(json => this.setState({
            catList: json.drinks
        }))
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
                {/* <form onSubmit={this.handleSubmit}> */}
                    {/* <div>
                        <label htmlFor="ingredient">Ingr: </label>
                        <input onChange={this.handleChange} type="text" id="ingredient" name="ingredient" value={this.state.ingredient}/>
                    </div>
                    <div>
                        <input type="submit" value="search"/>
                    </div> */}
                {/* </form> */}
                <CatDropdown handleChange={this.handleCatSel}/>
                <Test var={this.state.catSelect}/>
                {this.state.catChosen === true && <CatList catList={this.state.catList}/>}
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
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector('.cont'));