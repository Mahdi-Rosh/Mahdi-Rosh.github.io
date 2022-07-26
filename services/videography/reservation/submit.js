const inputs = {
    videoType: document.querySelector("input[name=video-type]"),
    city: document.querySelector("input[name=city]"),
    whatsAppNumber: document.querySelector("input[name=whatsapp-number]"),
    shootingDate: document.querySelector("input[name=shooting-date]"),
    deliveryDate: document.querySelector("input[name=delivery-date]"),
};

// If the user isn't logged in, redirect to the login page
fetch("../../../assets/php/ajax/is-logged-in.php").then( response => {
    response.json().then( json => {

        if (!json.isLoggedIn) {
            RedirectToLoginPage();
        }

    })
})

function Submit(event) {
    
    // Prevent The Page Refresh
    event.preventDefault();

    const data = {
        videoType: inputs.videoType.value,
        city: inputs.city.value,
        whatsAppNumber: inputs.whatsAppNumber.value,
        shootingDate: inputs.shootingDate.value,
        deliveryDate: inputs.deliveryDate.value,
    };

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            
            console.log(this.responseText);
            const json = JSON.parse(this.responseText);
            console.log(json);

            if (!json.success) {
                // We Got Erros!
                DisplayErrorMessages(json.errors);
            } else {
                // Success!
                DisplaySubmitSuccess();
            }

        }
    }

    xhr.open("POST", "../../../assets/php/ajax/services/videography.php");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));

}

function DisplayErrorMessages(errors) {
    
    console.log(errors);

}

function DisplaySubmitSuccess() {
    
    console.log("Success!");

}

function RedirectToLoginPage() {
    const currentAddress = encodeURIComponent(location.href);
    location.href = "/registration/log-in/?continue=" + currentAddress;
}