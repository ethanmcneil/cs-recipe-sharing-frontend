import React from 'react';
import './style.css';
import axios from 'axios';
import AuthService from '../../services/auth.service';

let currentUser = AuthService.getCurrentUser();

class ViewRecipeDetails extends React.Component {
    constructor(){
        super();
        this.state = {
            user: null,
            recipe: {},
            ingredients: [],
        }
    }
    componentDidMount(){
        const { recipe } = this.props.location.state;
        if(AuthService.getCurrentUser()){
        AuthService.saveDetails()
        let user = JSON.parse(localStorage.getItem('user'));
         this.setState({
             user: user
         })
        }
        // TODO: only show save a recipe if user is logged in
        this.setState({
            recipe: recipe,
            ingredients: recipe.ingredients
        })
    }
    componentDidUpdate(){
    }

    saveRecipe() {
        if(AuthService.getCurrentUser()){
        const URL = "http://localhost:8080/api/user/my-recipe";
        const headers = {
            Authorization: this.state.user.authorization,
            userId: this.state.user.id,
            recipeId: this.state.recipe.id,
        }
        
        axios({
            url: URL,
            method: "PUT",
            headers:headers
        }).then(response => {
            if(response.status === 200){
                alert("Done!")
                AuthService.saveDetails();
                let buttonText = document.getElementById("saveButtonText").innerHTML;
                if(buttonText.includes("Unsave")) {
                    document.getElementById("originalText").style.display = "none";
                    document.getElementById("newText").innerHTML = "Save Recipe";
                    document.getElementById("saveButtonText").style.backgroundColor = "#cc1e1e";
                    
                }
                else {
                    document.getElementById("originalText").style.display = "none";
                    document.getElementById("newText").innerHTML = "Unsave Recipe"
                    document.getElementById("saveButtonText").style.backgroundColor = "#007bff";
                }
            }
            else {
                alert("Recipe could not be saved - error!")
            }
        })
        }
        else {
            alert("You must be logged in to save a recipe!");
        }
    }

    render(){
        return(
            <div>
                <div className="container recipe-details">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="page-header">
                                <h1>{this.state.recipe.title}</h1>
                                <hr />
                            </div>
                            
                            <div className="recipe-description">
                                {this.state.recipe.description}
                            </div>
                            <hr />
                            <div className="recipe-stats">
                                <h3>Serving Size: <span className="badge badge-primary">{this.state.recipe.servingSize}</span></h3>
                                <h3>Cook Time: <span className="badge badge-primary">{this.state.recipe.cookTime} min</span></h3>
                                <h3 >Difficulty:<span className="badge badge-primary">{this.state.recipe.difficulty}</span></h3>
                            
                            
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="image">
                                <img className="rounded" alt="food" src={this.state.recipe.image} />
                                {this.state.user && (
                                <button id="saveButtonText" className="save-recipe" onClick={() => this.saveRecipe()}><span id="originalText">{currentUser.savedRecipes.includes(this.state.recipe.id) ? "Unsave Recipe" : "Save Recipe"}</span><span id="newText"></span></button>
                            )}
                            </div>
                            
                        </div>
                    </div>
                    <div className="row my-5">
                        <div className="col-md-4">
                            <div className="ingredients">
                                <h3>Ingredients:</h3>
                                <ul className="list-group list-group-flush">
                                {
                                        this.state.ingredients.map(item => {
                                            return <li className="list-group-item" key={item.name}>{item.name} amount: {item.amount} {item.measurement}</li>
                                        })
                                }
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-6">
                            <h3>Method:</h3>    
                            <div
                            dangerouslySetInnerHTML={{
                                __html: this.state.recipe.directions
                            }}></div>
                        </div>    
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewRecipeDetails;