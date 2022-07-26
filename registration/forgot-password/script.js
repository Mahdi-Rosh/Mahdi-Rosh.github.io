const inputs = {
    email: document.querySelector("input[type=email]"),
};

const messageElem = document.querySelector("#message-container");

function Submit(event) {
    
    // Prevent The Page From Refreshing
    event.preventDefault();

    // Data That We Want To Send
    const data = {
        email: inputs.email.value,
    };

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            
            console.log(this.responseText);
            const json = JSON.parse(this.responseText);
            console.log(json);

            SetMessage(json.message);

        }
    }

    xhr.open("POST", "../../assets/php/ajax/forgot-password.php");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));

}

function SetMessage(message) {
 
    messageElem.innerText = message;

}