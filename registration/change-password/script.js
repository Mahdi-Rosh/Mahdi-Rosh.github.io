const inputElems = {
    newPass: document.querySelector("#new-password"),
    newPassRepeat: document.querySelector("#new-password-repeat"),
};
const messageElem = document.querySelector("#message");

const parsedQuery = ParseQueryString();

if (!parsedQuery.key) {
    // There Is No Key In The URL, Redirect!
    location.href = "../forgot-password/";
}

function Submit(event) {
    
    // Prevent The Page Refresh
    event.preventDefault();

    if (inputElems.newPass.value != inputElems.newPassRepeat.value) {
        
        SetMessage("رمز ورود ها یکی نیستند!");
        return;
    }

    const data = {
        newPassword: inputElems.newPass.value,
        key: parsedQuery.key,
    };


    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            
            const json = JSON.parse(this.responseText);

            if (!json.success) {
                // Failed! Redirect To The Forgot Password Page
                location.href = "../forgot-password/";
            } else {
                // Success! Redirect To The Login Page
                location.href = "../log-in/";
            }

        }
    }

    xhr.open("POST", "../../assets/php/ajax/change-password.php");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));

}

function SetMessage(message) {
    
    messageElem.innerText = message;

}