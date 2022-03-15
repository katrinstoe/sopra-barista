/***
 * coffees and costumers stored in sessions and in the given arrays
 * @type {any}
 */
var coffeesForLevel3 = JSON.parse(sessionStorage.getItem("allCoffees"));
var coffeestored = [];
var customersLevel3 = JSON.parse(sessionStorage.getItem("sixCustomers"));
var customersLevel3Img = [];


/**
 * random coffee numbers and costumer numbers to know who has to pay or get invited
 * @type {null}
 */
let randomCoffeeNumberOf5 = null;
let nextCostumerWhoHasToPay = null;
let randomCostumerAmount = null;
let nextRandomNumber = null;
let costumerNumber = 0;

let costumerNumberAlreadyPayed = 0;
let numberOfWrongTipInputs = 0;


/**
 * calculations variables
 * @type {null}
 */
let total = null;
let totalInput = null;
let numberOfWrongInputPrices = null;
let payer = 0;
let navbarMoney = Number($('#money').text());

/**
 * points variables
 * @type {Element}
 */
let resultDisplayLevel3 = document.querySelector('#result');
let pointsAdded = 0;
let numberOfWrongInputPricesTotal = 0;


/**
 * Function is called when submit btn is pressed.
 * The total price amount of the to be calculated coffees is generated by fetching the randomCoffeeNumber from the session Storage.
 * If the input box is empty, it will display a message error to add a price in to the input box, else it will display the modal.
 * If the formatted input prices are equal to the formatted total price fetched ,it checks if the number of wrong choices are below 4 to display the correct text, gets the correct tips form the method  and displays the input box and Tip button, the input box of the total prices changes to a read only.
 * When not the case then it will display a different text in modal to try again. The numberOfWrongInputPrices increases.
 * @returns {Promise<void>}
 */
async function submitTotalPrice() {
    document.getElementById('btnNextCostumer2').style.display = "none"
    var submitModal = $('#costumerAnswerAfterSubmit');

    let submitTotalInputText = document.getElementById('submitPriceInput');
    totalInput = numFormatInput(submitTotalInputText.value);
    if (payer < 1) {
        if (numberOfWrongInputPrices <= 0) {
            for (let i = 0; i <= randomCoffeeNumberOf5; i++) {
                total += coffeestored[i].price
            }
            total.toFixed(2);
            costumerNumber += randomCoffeeNumberOf5;


        }
    } else if (numberOfWrongInputPrices <= 0) {
        for (let i = 0; i <= nextRandomNumber; i++) {
            total += coffeestored[i].price
        }
        total.toFixed(2);
        costumerNumber += nextRandomNumber;

    }


    if (submitTotalInputText.value.length === 0) {
        $('#message-error').text(' You have to add a price');

    } else {
        submitModal.modal('show');
    }


    if (totalInput.toString() === numberFormatter(total).toString()) {

        if (numberOfWrongInputPrices <= 3) {
            let tip = tipReceiver();

            $('#message-error').text(' You added the correct price! Your costumer wants to give you a  ' + tip.toString() + "% tip.");
            document.getElementById('btnsubmit').style.display = "block";
            document.getElementById('tileHeaderAfterSubmit').innerHTML = "Yeahy you calculated correctly!!";
            document.getElementById('AfterSubmitCardBody').innerHTML = " I would love to give you a Tip: " + tip.toString() + "%";

            document.getElementById('tipInput').style.display = "block";
            document.getElementById('submitTip').style.display = "block";
            submitTotalInputText.readOnly = true;
            payer += 1;
            costumerNumberAlreadyPayed += costumerNumber + 1;
            pointsAdded += parseInt(tip);
            resultDisplayLevel3.textContent = pointsAdded.toString();
        }
    } else {
        numberOfWrongInputPrices++;
        if (numberOfWrongInputPrices >= 3) {
            splitCoffeesAndCostumers();
            payer += 1;
            document.getElementById('btnNextCostumer2').style.display = "block"
            document.getElementById('btnsubmit').style.display = "none"

            document.getElementById('tileHeaderAfterSubmit').innerHTML = "That's wrong!!!!"
            document.getElementById('AfterSubmitCardBody').innerHTML = "The correct amount would be: " + numberFormatter(total).toString() + " you will not receive a tip ";
            document.getElementById('submitPriceInput').value = "";
            resetCalculationsForNextCostumer();


        } else {
            document.getElementById('tileHeaderAfterSubmit').innerHTML = "Uhh that does not seem wright !";
            document.getElementById('AfterSubmitCardBody').innerHTML = "try again please";
            document.getElementById('submitPriceInput').value = "";
        }

    }

}
/**
 * When Function called, the tip percentage is generated.
 * If numberOfWrongInputPrices increases the less Tip percentage will given.
 * @returns   {null}tipPercentage
 */
function tipReceiver() {

    let tipPercentage = null;
    switch (numberOfWrongInputPrices) {
        case null:
            tipPercentage = 20.00;
            break;
        case 1:
            tipPercentage = 15.00;
            break;
        case 2:
            tipPercentage = 10.00;
            break;
        case 3:
            tipPercentage = 7.00;
            break;
        default :
            tipPercentage = 0;
            break;
    }
    return tipPercentage;


}

/**
 * Formating the prices to be used in order to compare them to each other in Euros.
 * @param value is the price  in total
 * @returns {*}price in Euro
 */
function numberFormatter(value) {
    return Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(value);
}

/**
 * Formatting the input int ot Euro to compare them with the prices
 * @param input is the price input from the user
 * @returns {*}price in Euro
 */

function numFormatInput(input) {
    input = parseFloat(input.replace(/,/g, '.'));
    return Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(input);
}

/**
 * The Function addingBonusPoints sets the correct bonusPoints looking at the number of WrongTip inputs.
 * @param numberOfWrongTipInputs
 */
function addingBonusPoints(numberOfWrongTipInputs) {
    let bonusPoints = 0;
    if (numberOfWrongTipInputs === 0) {
        bonusPoints += 10;
        pointsAdded += bonusPoints;
        resultDisplayLevel3.textContent = pointsAdded.toString();
        navbarMoney += bonusPoints;
    } else if (numberOfWrongTipInputs === 1) {
        bonusPoints += 5;
        pointsAdded += bonusPoints;
        resultDisplayLevel3.textContent = pointsAdded.toString();
        navbarMoney += bonusPoints;
    }
}

/***
 * Function submitTip() is called when btn on Modal is pressed after the Total with tip is inserted.
 * It calls the tipReceiver() function to get the Tip. The Tip is added with the total price and checked with the input.
 *
 */
function submitTip() {
    var submitModal = $('#costumerAnswerAfterSubmit')
    let tipInput = document.getElementById('tipInput');
    let tipInputFormattet = numFormatInput(tipInput.value);
    let tip = tipReceiver().toString();
    let totalWithTip = total;

    tip = Math.round((total * tip)) / 100;
    tip.toFixed(2);
    totalWithTip += tip;
    totalWithTip = numberFormatter(totalWithTip);

    if (tipInputFormattet.toString() === totalWithTip.toString()) {

        splitCoffeesAndCostumers();


        if (customersLevel3.length >= 1) {
            document.getElementById('btnsubmit').style.display = "none"
            $('#message-error').text("Total wit tip: " + tip);
            document.getElementById('tileHeaderAfterSubmit').innerHTML = "Yeahy you calculated the Tip correctly!!";
            document.getElementById('AfterSubmitCardBody').innerHTML = "Thank you very much :) ";

            document.getElementById('btnNextCostumer2').style.display = "block"
            addingBonusPoints(numberOfWrongTipInputs);


        } else {
            document.getElementById('tileHeaderAfterSubmit').innerHTML = "Yeahy you calculated correctly!!";
            document.getElementById('AfterSubmitCardBody').innerHTML = "Thank you very much for you service see you next Time:) ";
            document.getElementById('redoGame').style.display = "block"

            addingBonusPoints(numberOfWrongTipInputs);
            const moneyObjekt = {
                "moneyKey": navbarMoney,
            }
            fetch("/games/getMoney", {
                method: 'POST',
                body: JSON.stringify(moneyObjekt),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            $('#money').text(navbarMoney);
        }
        document.getElementById('submitPriceInput').value = "";
        document.getElementById('submitPriceInput').readOnly = false;

    } else if (numberOfWrongTipInputs <= 2) {
        document.getElementById('tileHeaderAfterSubmit').innerHTML = "Hmm not quite";
        document.getElementById('AfterSubmitCardBody').innerHTML = "try again you have " + (3 - numberOfWrongTipInputs) + " tries left";
        numberOfWrongTipInputs++;

    } else {
        splitCoffeesAndCostumers();
        if (customersLevel3.length >= 1) {
            document.getElementById('btnsubmit').style.display = "none"
            document.getElementById('tileHeaderAfterSubmit').innerHTML = "That's not right";
            document.getElementById('AfterSubmitCardBody').innerHTML = " It is " + totalWithTip.toString() + " next time you'll do better";
            document.getElementById('btnNextCostumer2').style.display = "block"


        } else {
            document.getElementById('tileHeaderAfterSubmit').innerHTML = "You calculated incorrectly!!";
            document.getElementById('AfterSubmitCardBody').innerHTML = "Don‘t worry, Thank you very much for you service  see you next Time:) ";
            document.getElementById('redoGame').style.display = "block"
            const moneyObjekt = {
                "moneyKey": navbarMoney,
            }
            fetch("/games/getMoney", {
                method: 'POST',
                body: JSON.stringify(moneyObjekt),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            $('#money').text(navbarMoney);
        }
        document.getElementById('submitPriceInput').value = "";
        document.getElementById('submitPriceInput').readOnly = false;
    }
    submitModal.modal('show');
    document.getElementById('tipInput').value = "";
}

/**
 * Function splitCoffeesAndCostumers() deletes the coffees and Costumers already calculated from the session storage.
 */
function splitCoffeesAndCostumers() {
    if (coffeesForLevel3.length >= 2) {
        coffeesForLevel3.splice(0, costumerNumber + 1);
        customersLevel3.splice(0, costumerNumber + 1);
        customersLevel3Img.splice(0, costumerNumber + 1);
    } else if (coffeesForLevel3.length <= 1) {
        coffeesForLevel3.length = 0;
        customersLevel3.length = 0;
        customersLevel3Img.length = 0;
    }
    const customerImg = customersLevel3.map(customer => {
        return customer.customerImgPath;
    });

    for (let i = 0; i < customersLevel3Img.length; i++) {
        customersLevel3Img[i] = customerImg[i];
    }
}

/**
 * Function openNextModal() is called on click from the Modal.
 * It generates new Customer tiles for the new invited costumers and later on sets the correct costumer inside of it.
 * The coffee tables values, and the calculation values are reseted for the new calculations.
 */
function openNextModal() {
    document.getElementById('btnNextCostumer').style.display = "none"
    var modalAfterSubmit = $('#costumerAnswerAfterSubmit');
    var nextModalCostumer = $('#costumerWishModal');
    const addingMoreCostNext = $('#addingMoreCostumersNext')

    const coffeeOrderCustomersPayer = $('.card-img-Person-paying');
    const payerInModalNext = $('.card-img-Person-paying-modal2');
    const nextInvitedCustomer = Math.floor(Math.random() * randomCoffeeNumberOf5);

    $('#addingMoreCostumers').empty();
    addingMoreCostNext.empty();

    if (costumerNumber < 5) {
        let leftCostumers = coffeesForLevel3.length;
        nextRandomNumber = Math.floor(Math.random() * leftCostumers);
        if (nextRandomNumber <= 0) {
            document.getElementById('card-text-body-modal1').innerHTML = "I would just like to pay for my coffee";
        }
        if (nextRandomNumber >= 1) {
            document.getElementById('card-text-body-modal1').innerHTML = " Hi I would like to pay for ME and my " + nextRandomNumber + " FRIENDS shown below "
        }
        for (let i = 0; i <= nextRandomNumber - 1; i++) {
            if (nextRandomNumber >= 1) {
                addingMoreCostNext.append('<div class="col-4 addingCostumer mb-4" id=" ' + i + 'moreCostumers!" >\n' +
                    '                            <div class="card w-100 h-auto cursor-normal mx-2" style="width: 18rem;">\n' +
                    '                                <img class="p-3 card-img-Person-getting-payed" src="@assetsFinder.path("/images/waiter.png")" alt="Card image cap">\n' +
                    '                            </div>')
            }
        }
    }
    costumerNumber = 0;
    for (let i = 0; i < coffeeOrderCustomersPayer.length; i++) {
        coffeeOrderCustomersPayer[i].src = customersLevel3Img[i];
        payerInModalNext[i].src = customersLevel3Img[i];

    }
    const customerBeingPayed = $('.card-img-Person-getting-payed')
    for (let i = 1; i <= customerBeingPayed.length; i++) {
        customerBeingPayed[i - 1].src = customersLevel3Img[i];
    }
    $("#invoice-table").find("tr:gt(0)").remove();
    resetCalculationsForNextCostumer();
    modalAfterSubmit.modal('hide');
    nextModalCostumer.modal('show');

    document.getElementById('btnsubmit').style.display = "block"

}

/**
 * Function resetCalculationsForNextCostumer()  Resets everything necessary for the new calculations.
 */
function resetCalculationsForNextCostumer() {

    total = null;
    totalInput = null;
    numberOfWrongInputPricesTotal += numberOfWrongInputPrices;
    numberOfWrongInputPrices = null;
    numberOfWrongTipInputs = 0;


}

/**
 * adds Coffees in to the table underneath and adds its price within by taking the coffees from the session
 * storage.
 * @returns {Promise<void>}
 */
async function addCoffeeToPay() {

    coffeesForLevel3.forEach((coffee, j) => {
        coffeestored[j] = {
            title: coffee.title,
            price: coffee.price
        }

    })
    let selectedCoffee = $('.coffeePickerdiv :selected').text();

    let price = 0;


    if (selectedCoffee !== 'Choose the correct Coffee...') {
        // if coffee exists in the table add a message
        if ($('#' + selectedCoffee).length) {
            $('#message-error').text('This coffee has already been selected');
        } else {
            $('#message-error').text('');

            coffeestored.forEach((coffee, i) => {
                if (selectedCoffee === coffee.title) {
                    price = coffee.price;
                }
            });

            $('#invoice-table').append('<tr><td id="' + selectedCoffee + '">' + selectedCoffee + '</td><td id="' + selectedCoffee + 'Price">' + price + '</td>');
            $('#inputGroupSelect01').val('None')
        }
    } else {
        $('#message-error').text('You have to select a coffee!');
    }
}
/**
 * removes the coffees in the table  just added on click.
 */
function removeCoffeeForPay() {
    $("#invoice-table").find("tr:gt(0)").remove();
}

async function loadModal() {
    var gameModal = $('#gameModal2')
    gameModal.modal('show');
    document.getElementById('tipInput').style.display = "none"
    document.getElementById('submitTip').style.display = "none"
    document.getElementById('btnNextCostumer').style.display = "none"

    /**
     * Class CoffeeToBePayed generates Random Numbers for the calculations.
     */
    class CoffeeToBePayed {
        constructor() {
            this.getRandomCoffeeAmountNumber()
            this.getNextPayingCostumer()
            this.getNextRandomCoffeeOrders()
        }

        getRandomCoffeeAmountNumber() {
            randomCoffeeNumberOf5 = Math.floor(Math.random() * 5)
            return randomCoffeeNumberOf5

        }

        getNextPayingCostumer() {

            randomCostumerAmount = this.getRandomCoffeeAmountNumber();
            if (randomCostumerAmount < 5) {
                nextCostumerWhoHasToPay = randomCostumerAmount + 1;
            }
            return nextCostumerWhoHasToPay;
        }

        getNextRandomCoffeeOrders() {
            return Math.floor(Math.random() * randomCoffeeNumberOf5);
        }

    }
    /***
     * gets the RandomCoffeeAmountNumber from the CoffeeToBePayed class and uses  them to define how many coffees one costumer has to pay.
     * Costumers who are payed for are shown in the model Costumer ( adding costumer)
     * @type {CoffeeToBePayed}
     */
    const payedCoffeeNumber = new CoffeeToBePayed();
    const numberOfPayedCoffeeByOneCostumer = payedCoffeeNumber.getRandomCoffeeAmountNumber();

    document.getElementById("label").innerText = numberOfPayedCoffeeByOneCostumer.toString();
    if (numberOfPayedCoffeeByOneCostumer <= 0) {

        document.getElementById('card-text-body-modal1').innerHTML = "I would just like to pay for my coffee";

    }
    if (numberOfPayedCoffeeByOneCostumer >= 2) {
        document.getElementById('card-text-body-modal1').innerHTML = " Hi I would like to pay for ME and my " + numberOfPayedCoffeeByOneCostumer + " FRIEND(S) shown below "
    }
    for (let i = 0; i <= numberOfPayedCoffeeByOneCostumer - 1; i++) {

        if (numberOfPayedCoffeeByOneCostumer >= 1) {
            $('#addingMoreCostumers').append('<div class="col-4 addingCostumer" id=" ' + i + 'moreCostumers">\n' +
                '                            <div class="card w-100 h-auto cursor-normal mx-2" style="width: 18rem;">\n' +
                '                                <img class="p-3 card-img-Person-getting-payed" src="@assetsFinder.path("/images/waiter.png")" alt="Card image cap">\n' +
                '                            </div>')
        }
    }

    /*** put Coffeetitles in modal*/

    const coffeeOrderCardsLevel3 = $('.card-text');
    const coffeeTitles = coffeesForLevel3.map(coffee => {
        return coffee.title
    });
    for (let i = 0; i < coffeeOrderCardsLevel3.length; i++) {
        coffeeOrderCardsLevel3[i].innerText = coffeeTitles[i];
    }

    const coffeeOptionsForInputGroup = $('.options');
    const coffeePrices = coffeesForLevel3.map(coffee => {
        return coffee.prices;
    });
    for (let i = 0; i < coffeeOptionsForInputGroup.length; i++) {
        coffeeOptionsForInputGroup[i].innerText = coffeeTitles[i]
    }
    /**put CustomerImages in to the tiles */

    const coffeeOrderCustomers = $('.card-img-top');
    const customerImg = customersLevel3.map(customer => {
        return customer.customerImgPath;
    });

    for (let i = 0; i < customersLevel3.length; i++) {
        customersLevel3Img[i] = customerImg[i];
    }
    for (let i = 0; i < coffeeOrderCustomers.length; i++) {
        coffeeOrderCustomers[i].src = customersLevel3Img[i];
    }

    /** put CustomerImages of the Payer in the correct modal position in Model 1 and Modal 2 and Modal Next*/
    const coffeeOrderCustomersPayer = $('.card-img-Person-paying');
    const coffeeOrderCustomersPayerModal2 = $('.card-img-Person-paying-modal2');


    for (let i = 0; i < coffeeOrderCustomersPayer.length; i++) {
        coffeeOrderCustomersPayer[i].src = customersLevel3Img[i];
        coffeeOrderCustomersPayerModal2[i].src = customersLevel3Img[i];
    }

    /**
     * puts CustomerImages of the Customer invited for in to the model.
     * @type {*|jQuery|HTMLElement}
     */
    const customerBeingPayed = $('.card-img-Person-getting-payed');
    for (let i = 1; i <= customerBeingPayed.length; i++) {

        customerBeingPayed[i - 1].src = customersLevel3Img[i];

    }


}


window.addEventListener('load', loadModal)
