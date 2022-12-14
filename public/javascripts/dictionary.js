/**
 * creates HTML Elements on the fly for each coffee
 * these elements are bootstrap cards, containing the image of the coffee and in the body the description of the coffee
 * the footer is displayed via a bootstrap button collapse and contains the ingredients
 * then all the singular cards are appended into a big list and displayed
 * @param coffee
 * @param index
 */
function createDictEntry(coffee, index) {
    let cardCoffee = document.createElement("div");
    cardCoffee.classList.add("col-12", "col-md-4", "cardCoffee", "px-4", "pb-5");
    let imgCoffee = document.createElement("img");
    imgCoffee.src = coffee.coffeeImgPath;
    imgCoffee.classList.add("imgCoffee", "px-5", "pt-5");
    let divCardBody = document.createElement("div");
    divCardBody.classList.add("card-body", "text-white");
    let cardText = document.createElement("div");
    cardText.classList.add("p-3");
    cardText.innerText = coffee.description;
    let divFooter = document.createElement("div");
    divFooter.classList.add("card-footer", "rounded-lg");
    //Ingredients
    let ingredientText = document.createElement("medium");
    ingredientText.innerText = "Ingredients: " + coffee.ingredientList.join(", ");
    ingredientText.classList.add("ingredient-text", "text-white");

    //Collapse
    let divCollapseBody = document.createElement("div");
    divCollapseBody.id = "collapseBody" + index;
    divCollapseBody.classList.add("collapse");

    //CollapseButton
    let toggleButton = document.createElement("button");
    toggleButton.classList.add("btn-toggle", "btn-secondary", "rounded-pill", "py-2", "w-100")
    toggleButton.type = "button";
    toggleButton.dataset.target = "#collapseBody" + index;
    toggleButton.dataset.toggle = "collapse";
    toggleButton.ariaExpanded = "false";
    toggleButton.ariaControls = "collapseBody";
    toggleButton.innerText = "Read more";


    cardCoffee.appendChild(imgCoffee);
    cardCoffee.appendChild(divCardBody);
    divCardBody.appendChild(toggleButton);

    divCardBody.appendChild(divCollapseBody);
    divCollapseBody.appendChild(cardText);
    divCollapseBody.appendChild(divFooter);
    divFooter.appendChild(ingredientText);
    document.querySelector(".card-group").appendChild(cardCoffee);
}

/**
 * this awfully long function creates the entire dictionary
 * it first fetches the coffees from the database and mapes the images from each coffee
 * then it sorts the entries alphabetically
 * calls createDictEntry
*/
async function createDictionary(){
    let response = await fetch("http://localhost:9000/coffees/getCoffees");
    let coffeeList = await response.json();
    coffeeList = coffeeList.map(coffee=>{
        coffee.coffeeImgPath = "../assets/images/coffee/"+ coffee.coffeeImgPath;
        return coffee
    })
    coffeeList.sort((a, b)=>a.title.localeCompare(b.title))

    coffeeList.forEach((coffee, index) => {
        createDictEntry(coffee, index);
    })
}

