// Username Email Password PhoneNumber

const inputs = {
    username: document.querySelector("input#username"),
    email: document.querySelector("input#email"),
    password: document.querySelector("input#password"),
    phoneNumber: document.querySelector("input#phone-number"),
};

const errorElems = {
    username: document.querySelector("div.username-error"),
    email: document.querySelector("div.email-error"),
    password: document.querySelector("div.password-error"),
    phoneNumber: document.querySelector("div.phone-number-error"),
};

const parsedURL = ParseQueryString();

console.log(hasContinueAddress);

function SignUp(event) {
    
    event.preventDefault();

    const data = {
        username: inputs.username.value,
        email: inputs.email.value,
        password: inputs.password.value,
        phoneNumber: inputs.phoneNumber.value,
    };

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            
            ResetErrorMessages();
            console.log(this.responseText);
            const json = JSON.parse(this.responseText);
            console.log(json);

            if (!json.success) {
                // Failed! Have Errors!
                SetErrorMessages(json.errors);
                
            } else {
                // Success!

                // Check If We Have A Continue Address In The URL
                if (parsedURL.continue) {
                    // Put The Continue Address In The Redirect
                    location.href = "../verification/?continue=" + parsedURL.continue;
                } else {
                    // Redirect To The Verification Page
                    location.href = "../verification/";
                }

            }
        }
    }

    xhr.open("POST", "../../assets/php/ajax/sign-up.php");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));

}

function ResetErrorMessages() {
    
    errorElems.username.innerText = "";
    errorElems.email.innerText = "";
    errorElems.password.innerText = "";
    errorElems.phoneNumber.innerText = "";

}

function SetErrorMessages(errors) {

    if (errors.username) {
        errorElems.username.innerText = errors.username;
    }
    if (errors.email) {
        errorElems.email.innerText = errors.email;
    }
    if (errors.password) {
        errorElems.password.innerText = errors.password;
    }
    if (errors.phoneNumber) {
        errorElems.phoneNumber.innerText = errors.phoneNumber;
    }

}