async function addCoffee() {
    $('#firstCoffee .coffePickerdiv').clone().appendTo('#moreCoffee');
}

async function removeCoffee() {
    $('#moreCoffee .coffePickerdiv').last().remove();
}

function addCoffeeToPay() {
    let selectedCoffee = $('.coffePickerdiv :selected').text();
    let quantity = 1;
    let price = 2.3; // take it later from database
    let total = price;

    if (selectedCoffee != 'Choose the correct Coffee...') {
        // if coffee exists in the table increase quantity
        if ($('#' + selectedCoffee).length) {
            quantity = parseInt($('#' + selectedCoffee + 'Quantity').text()) + 1;
            price = parseFloat($('#' + selectedCoffee + 'Price').text());
            let total = (quantity * price).toFixed(2);
            $('#' + selectedCoffee + 'Quantity').text(quantity);
            $('#' + selectedCoffee + 'Total').text(total);
        } else {
            quantity = 1
            $('#message-error').text('');
            $('#invoice-table').append('<tr><td id="' + selectedCoffee + '">' + selectedCoffee + '</td><td id="' + selectedCoffee + 'Quantity">' + quantity + '</td><td id="' + selectedCoffee + 'Price">' + price + '</td><td id="' + selectedCoffee + 'Total">' + total + '</td></tr>');
        }
        console.log("pressed");
    } else {
        $('#message-error').text('You have to select a coffee!');
    }
}

function removeCoffeeForPay() {
    let selectedCoffee = $('.coffePickerdiv :selected').text();
    let quantity = parseInt($('#' + selectedCoffee + 'Quantity').text());
    let price = parseFloat($('#' + selectedCoffee + 'Price').text());

    // solve the error
    if ($('#' + selectedCoffee).length) {
        // if coffee exists in the table increase quantity
        if (quantity > 1) {
            quantity = parseInt($('#' + selectedCoffee + 'Quantity').text()) - 1;
            price = parseFloat($('#' + selectedCoffee + 'Price').text());
            let total = (quantity * price).toFixed(2);
            $('#' + selectedCoffee + 'Quantity').text(quantity);
            $('#' + selectedCoffee + 'Total').text(total);
        } else {
            $('#' + selectedCoffee).closest("tr").remove();
        }
    } else {
        $('#message-error').text('You cannot delete this element!');
    }
}

async function loadModal() {
    var gameModal = $('#gameModal2')
    gameModal.modal('show');

    /**
     * CoffeesForGame is a class, that has sixCoffees in the Constructor
     * it first generates a random Number
     * then it creates randomSixCoffees and Titles*/

    // class CoffeesForGame {
    //     constructor() {
    //         this.sixCoffees = ['Hallo']
    //     }
    //
    //     getRandomNumber(lengthArray) {
    //         const randomNumber = Math.floor(Math.random() * lengthArray);
    //         return randomNumber
    //     }
    //
    //     /**
    //      * fetch random coffees from API
    //      * then it searches with help of our randomnumber earlier a coffee in the API output and pushes that coffee to sixCoffees Array (line 60) and shortens the API output array at that index with splice
    //      * then it saves the coffe into sixCoffees from the constructor
    //      * save it to sessionstorage
    //      * */
    //     async getRandomSixCoffees() {
    //         let response = await fetch("http://localhost:9000/coffees/getCoffees");
    //         let coffeelist = await response.json();
    //
    //         coffeelist = coffeelist.map(coffee => {
    //             coffee.coffeeImgPath = "../assets/images/CoffeeTexts/" + coffee.coffeeImgPath;
    //             return coffee
    //         })
    //         const sixCoffees = []
    //         for (let i = 0; i < 6; i++) {
    //             const randomNumber = this.getRandomNumber(coffeelist.length)
    //             sixCoffees.push(coffeelist.splice(randomNumber, 1)[0])
    //         }
    //         this.sixCoffees = sixCoffees; //instanzvariable für sixcoffees
    //         window.sessionStorage.setItem("coffees", JSON.stringify(this.sixCoffees))
    //
    //     }
    //     /**getCoffeeTitles() returns a map with the titles from sixCoffees*/
    //     getCoffeeTitles() {
    //         return this.sixCoffees.map(coffee => {
    //             return coffee.title
    //         });
    //     }
    //     // getCoffeePrices() returns a map with the prices of the sixCoffees
    //     getCoffeePrices(){
    //         return this.sixCoffees.map(coffee => {
    //             return coffee.title + "  " + coffee.price+"€"
    //         })
    //     }

    // getPricesForCoffee(){

    // this.sixCoffees.forEach(coffeePrices => {
    //     this.sixCoffees = {
    //         price: coffeePrices.price
    //     }
    //
    //    return  coffeePrices.price
    //
    // });
    //     }
    // }


    /**
     * Customers is a class with the Instructor sixCustomer Array and this.getRandomSixCustomers()
     * it first generates a random Number
     * then it creates randomSixCustomers and Images*/
        // class Customers {
        //     constructor() {
        //         this.sixCustomers = []
        //         this.getRandomSixCustomers()
        //     }
        //
        //     getRandomNumber(lengthArray) {
        //         const randomNumber = Math.floor(Math.random() * lengthArray);
        //         return randomNumber
        //     }
        //
        //     /**gets Customers (later) and puts them into array*/
        //     getRandomSixCustomers() {
        //         const CustomerArray = []
        //         const sixCustomers = []
        //         CustomerArray[0] = '../assets/images/Customers/black-woman.png'
        //         CustomerArray[1] = '../assets/images/Customers/karen.png';
        //         CustomerArray[2] = '../assets/images/Customers/old-woman.png';
        //         CustomerArray[3] = '../assets/images/Customers/young-man.png';
        //         CustomerArray[4] = '../assets/images/Customers/samurai-man.png';
        //         CustomerArray[5] = '../assets/images/Customers/red-head-man.png';
        //         CustomerArray[6] = '../assets/images/Customers/old-black-man.png';
        //         CustomerArray[7] = '../assets/images/Customers/indian-woman.png';
        //         // console.log(CustomerArray);
        //         for (let i = 0; i < 6; i++) {
        //             const randomNumber = this.getRandomNumber(CustomerArray.length);
        //             sixCustomers.push(CustomerArray.splice(randomNumber, 1)[0]);
        //         }
        //         console.log(sixCustomers)
        //         this.sixCustomers = sixCustomers;
        //         window.sessionStorage.setItem("customers", JSON.stringify(this.sixCustomers))
        //     }
        //
        //     /**Saves the Customer Images into map*/
        //     getCustomerImages() {
        //         return this.sixCustomers.map(customer => customer);
        //     }
        // }
    class CoffeeToBePayed {
        constructor() {
            this.getRandomCoffeeAmountNumber()
            this.getNextPayingCostumer()
            this.getNextRandomCoffeeOrders()
        }

        getRandomCoffeeAmountNumber() {
            const randomNumber = Math.floor(Math.random() * 5);
            return randomNumber
        }

        getNextPayingCostumer() {
            let nextCostumerWhoHasToPay = null;
            let randomCostumerAmount = this.getRandomCoffeeAmountNumber();
            if (randomCostumerAmount < 5) {
                nextCostumerWhoHasToPay = randomCostumerAmount + 1;
            }
            return nextCostumerWhoHasToPay;
        }

        getNextRandomCoffeeOrders() {
            const randomNumberCoffee = this.getRandomCoffeeAmountNumber();
            return Math.floor(Math.random() * randomNumberCoffee);
        }

    }

    /*** put Coffeetitles in modal*/

        // const coffeesForGame = new CoffeesForGame();
        // await coffeesForGame.getRandomSixCoffees();
    var coffeesForLevel3 = JSON.parse(sessionStorage.getItem("allCoffees"))
    console.log(coffeesForLevel3)
    const coffeeOrderCardsLevel3 = $('.card-text');
    const coffeeTitles = coffeesForLevel3.map(coffee => {
        return coffee.title
    });
    for (let i = 0; i < coffeeOrderCardsLevel3.length; i++) {
        coffeeOrderCardsLevel3[i].innerText = coffeeTitles[i];
    }
    // const coffeeTitles = coffeesForGame.getCoffeeTitles();
    //
    // console.log(coffeeTitles)
    // for (let i = 0; i < coffeeOrderCards.length; i++) {
    //     coffeeOrderCards[i].innerText = coffeeTitles[i];
    // }
    // putting the coffees in the options of the input group Select
    const coffeeOptionsForInputGroup = $('.options');
    // var coffeePrices= []
    const coffeePrices = coffeesForLevel3.map(coffee => {
        return coffee.price
    });
    // const coffeePrices = coffeesForGame.getCoffeePrices();
    console.log(coffeePrices)
    for (let i = 0; i < coffeeOptionsForInputGroup.length; i++) {
        coffeeOptionsForInputGroup[i].innerText = coffeeTitles[i]  // show title of the coffee
    }

    /**put CustomerImages in to the tiles */
    var customersLevel3 = JSON.parse(sessionStorage.getItem("sixCustomers"))
    console.log(customersLevel3)
    const coffeeOrderCustomers = $('.card-img-top');

    var customersLevel3Img = []
    for (let i = 0; i < customersLevel3.length; i++) {
        customersLevel3Img[i] = customersLevel3[i].customerImgPath
    }
    for (let i = 0; i < coffeeOrderCustomers.length; i++) {
        coffeeOrderCustomers[i].src = customersLevel3Img[i];
    }
    /** put CustomerImages of the Payer in the correct modal position and the CustomerImages of the customers who are beeing payed for*/
    const coffeeOrderCustomersPayer = $('.card-img-Person-paying');
    for (let i = 0; i < coffeeOrderCustomersPayer.length; i++) {
        coffeeOrderCustomersPayer[i].src = customersLevel3Img[i]
    }

    /**
     * puts CustomerImages of the ones who are being payed for in to the model.
     * @type {*|jQuery|HTMLElement}
     */
    const customerBeingPayed = $('.card-img-Person-getting-payed')
    for (let i = 0; i < customerBeingPayed.length; i++) {
        customerBeingPayed[i].src = customersLevel3Img[i]; // show the image
    }

    function submitTotal() {
        let submitTotalButtonText = document.getElementById('submitGame');
    }

    /***
     * gets the RandomCoffeeAmountNumber from the CoffeeToBePayed class and usess them to define how many coffees one costumer has to pay.
     * Costumers who are payed for are shown in the model Costumer ( adding costumer)
     * @type {CoffeeToBePayed}
     */
    const payedCoffeeNumber = new CoffeeToBePayed();
    const numberOfPayedCoffeeByOneCostumer = payedCoffeeNumber.getRandomCoffeeAmountNumber();
    let costumerNumber = numberOfPayedCoffeeByOneCostumer;
    console.log(payedCoffeeNumber);
    document.getElementById("label").innerText = numberOfPayedCoffeeByOneCostumer.toString();
    if (numberOfPayedCoffeeByOneCostumer === 0) {
        document.getElementById('#imageCostumer1').display = 'none';
        document.getElementById('#card-text-body-modal1').innerHTML = "I would like to pay for just my coffee"

    }
    for (let i = 0; i <= numberOfPayedCoffeeByOneCostumer - 1; i++) {

        if (numberOfPayedCoffeeByOneCostumer > 1) {

            $('.addingCostumer').clone().appendTo('#addingMoreCostumers');
            i++;
        }


    }


    // adds further costumers if needed.


    //let nextInvitedCostumers = Math.floor(Math.random()* numberOfPayedCoffeeByOneCostumer);
    // console.log(nextInvitedCostumers)
    if (costumerNumber < 5) {
        let leftCostumers = 5 - costumerNumber;
        let nextRandomNumber = Math.floor(Math.random() * leftCostumers);

        for (let j = 0; j <= nextRandomNumber; j++) {
            $('.addingInvitedCostumer2').clone().appendTo('#addingMoreCostumers2');
            j++;
        }
        document.getElementById("label2").innerText = "invited: " + nextRandomNumber + "\n random " + numberOfPayedCoffeeByOneCostumer.toString();

    }


}


window.addEventListener('load', loadModal)
