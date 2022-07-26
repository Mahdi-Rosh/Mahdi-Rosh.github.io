const inputs = {
    phoneNumber: document.querySelector("input#phoneNumber"),
    password: document.querySelector("input#password"),
};

const errorElement = document.querySelector("#error");

function Login(event) {
    
    // Prevent The Page Refresh
    event.preventDefault();

    // Data That We Want To Send
    const data = {
        phoneNumber: inputs.phoneNumber.value,
        password: inputs.password.value
    };

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            
            const json = JSON.parse(this.responseText);

            if (!json.success) {
                // We Had Errors!
                SetErrorMessages(json.errors);
            } else {
                // Success! User Is Logged In
                const parsedURL = ParseQueryString();
                if (parsedURL.continue) {
                    // If We Have A Continue Address In The URL, Redirect To That Address
                    location.href = parsedURL.continue
                } else {
                    // Redirect To The Home Page
                    location.href = "/";
                }
            }

        }
    }

    xhr.open("POST", "../../assets/php/ajax/login.php");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));

}

function SetErrorMessages(errors) {
 
    if (errors.phoneNumber) {
        errorElement.innerText = errors.phoneNumber;
    } else {
        errorElement.innerText = errors.password;
    }

}