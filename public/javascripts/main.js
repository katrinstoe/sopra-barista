var gameModal = $('#ModalLearnCoffees')

async function loadModal() {
    // var currentCustomer = JSON.parse(sessionStorage.getItem("connected"))
    var currentUserString = sessionStorage.getItem("currentUser");
    let currentUser = JSON.parse(currentUserString);
    console.log(currentUser);

    if (currentUser.points === 0){
        gameModal.modal('show');
    }
}
// //TODO: As soon as Database is up to date fetch points from user to only show modal after first login


//     let response = await fetch("http://localhost:9000/api/coffees");
//     let UserPoints = await response.json();
//  if (UserPoints = 0){
//      window.addEventListener('load', loadModal)
//  }
window.addEventListener('load', loadModal)
