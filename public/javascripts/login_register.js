function checkLogin() {
    // e.preventDefault();
    let nameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");

    const userData = {        //JSON objekt mit Keys und values nach Stringify
        username: nameInput.value,   //werte auslesen in Objektnotion
        password: passwordInput.value
    }

    fetch("/user/auth", {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        // console.log(response);
        if (response.ok) {
            response.text().then(res => sessionStorage.setItem("currentUser", res))
            window.location = response.headers.get("Location");
        } else {
            // window.alert("Wrong Username or Password");
            document.getElementById("alert-login").classList.add("alert", "alert-light");
            document.getElementById("alert-message").innerHTML = "Wrong username or password!";
            nameInput.value = "";
            passwordInput.value = "";
            nameInput.focus();
            return response.json();
        }
    })
    //     .then(userData => {
    //     window.alert(userData.message);
    //     nameInput.value = "";
    //     passwordInput.value = "";
    //     nameInput.focus();
    // })
}

// https://stackoverflow.com/questions/15017052/understanding-email-validation-using-javascript
// regexper.com - to understand the regex expression
function checkEmail(email) {
    let validEmail = new RegExp('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')
    let emailError = document.getElementById("email-error");

    if (validEmail.test(email)) {
        emailError.innerHTML = '';
        return true;
    }

    emailError.innerHTML = "Email format should be like example@domain.com";
    return false;
}

function checkUsername(username) {
    let nameError = document.getElementById("name-error");

    if (username.length >= 3 && username.length <= 25) {
        nameError.innerHTML = '';
        return true;
    }

    nameError.innerHTML = "Username should be between 3 and 25 characters";
    return false;
}

// https://www.section.io/engineering-education/password-strength-checker-javascript/
function checkPasswordStrength(password) {
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    let passwordStrengthError = document.getElementById("password-strength-error");

    if (strongPassword.test(password)) {
        passwordStrengthError.innerHTML = '';
        return true;
    }

    passwordStrengthError.innerHTML = "The password is not strong";
    return false;

}

function checkPasswords(password, repeatedPassword) {
    let passwordError = document.getElementById("password-error");

    if (checkPasswordStrength(password) && password === repeatedPassword) {
        passwordError.innerHTML = "";
        return true;
    }

    passwordError.innerHTML = "Passwords don't match";
    return false;
}

// function testForm() {
//     let email = document.getElementById("email").value;
//     let username = document.getElementById("username").value;
//     let password = document.getElementById("password").value;
//     let password2 = document.getElementById("password2").value;
//
//     if (checkEmail(email) && checkUsername(username) && checkPasswords(password, password2)){
//         console.log('everything is fine');
//     } else {
//         checkEmail(email);
//         checkUsername(username);
//         checkPasswords(password, password2);
//         console.log('sth is incorrect');
//     }
// }


function checkCreateAccount() {
    // e.preventDefault();
    let emailInput = document.getElementById("email");
    let nameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");
    let password2Input = document.getElementById("password2");

    const userData = {        //JSON objekt mit Keys und values nach Stringify
        email: emailInput.value,
        username: nameInput.value,   //werte auslesen in Objektnotion
        password: passwordInput.value,
        password2: password2Input.value
    }

    if (checkEmail(userData.email) && checkUsername(userData.username) && checkPasswords(userData.password, userData.password2)) {
        fetch("/user/checkCreateAccount", {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if (response.ok) {
                window.alert("User created successfully")
                return window.location = response.url;
            } else {
                return response.json()
            }
        }).then(userData => {
            // alert(userData.message);
            document.getElementById("alert-auth").classList.add("alert", "alert-light");
            document.getElementById("alert-auth-message").innerHTML = userData.message;
            emailInput.value = "";
            nameInput.value = "";
            passwordInput.value = "";
            password2Input.value = "";
            passwordInput.focus();
        })
    } else {
        checkEmail(userData.email);
        checkUsername(userData.username);
        checkPasswords(userData.password, userData.password2);
        document.getElementById("alert-auth").classList.add("alert", "alert-light");
        document.getElementById("alert-auth-message").innerHTML = "The form couldn't be submitted. Check the errors!";
    }
}

$('html').keydown(function (e) {
    if (e.which === 13) {
        checkLogin();
        checkCreateAccount();
    }
});