const input = document.querySelector("#otp");

const errorElem = document.querySelector("div#error");
const timerElem = document.querySelector("div#timer");
const timer = {
    seconds: 60,
    minutes: 1,
};

// Fetch The Time Data From The Server
fetch("../../assets/php/ajax/otp-time-info.php").then( response => {
    response.json().then( json => {

        const secondsRemaining = json.seconds;

        SetTimerWithSeconds(secondsRemaining);

        if (json.message) {
            SetErrorMessage(json.message);
        }

        // Start The Timer
        setInterval(() => {
            UpdateTime();
        }, 1000);

    });
});



function ValidateOTP(event) {

    event.preventDefault();

    const value = input.value;
    const data = {
        otp: value,
    };

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            
            const json = JSON.parse(this.responseText);

            SetTimerWithSeconds(json.remainingTime);

            if (!json.success) {

                SetErrorMessage(json.error);
            } else {

                // Success! User Is Logged In!
                // Check Whether We Have A Continue Address In The URL
                const queryResult = ParseQueryString();
                if (queryResult.continue) {
                    // Redirect to the continue address
                    location.href = queryResult.continue;
                } else {
                    // Redirect To The Home Page
                    location.href = "/logged-in.html";
                }

            }

        }
    }

    xhr.open("POST", "../../assets/php/ajax/validate-otp.php");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));

}

function UpdateTime() {

    if (timer.minutes === 0 && timer.seconds === 0) {
        return;
    }

    timer.seconds--;

    if (timer.seconds < 0) {
        timer.seconds = 60
        timer.minutes--;
    }

    const timerText = timer.minutes + ":" + timer.seconds;
    timerElem.innerText = timerText;

}

function SetTimerWithSeconds(seconds) {
    timer.minutes = Math.floor(seconds / 60);
    timer.seconds = seconds % 60;
}

function SetErrorMessage(error) {
    
    errorElem.innerText = error;

}