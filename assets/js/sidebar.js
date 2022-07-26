const sidebar = document.getElementById("sidebar-container");
const userIcon = document.getElementById("user-icon");
const userIconI = document.getElementById("user-Icon-I");

let isOpen = false;
let userIconOpacity = 100;

window.addEventListener("scroll", Scroll);

document.onclick = checkForClicks;

function ToggleMenu() {

    if (isOpen == true) {

        // If Open...

        sidebar.style.visibility = "hidden";
        sidebar.style.width = "0%";
        sidebar.style.boxShadow = "0px 0px 0px 0px rgba(0, 0, 0, 0.5)";

        userIconI.style.opacity = 0; // Fade Out
        userIconI.style.transform = "rotate(180deg)"; // Rotate To 180 Degrees
        setTimeout(() => {
            userIconI.className = "fa-solid fa-user";
            userIcon.style.color = "#F63854";
            userIconI.style.opacity = 100; // Fade In
            userIconI.style.transform = "rotate(360deg)" // Rotate To 0 Degrees
        }, 300);

        setTimeout(() => {
            isOpen = false;
        }, 500);


    } else {

        // If Closed...

        sidebar.style.visibility = "visible";
        sidebar.style.width = "35%";
        sidebar.style.boxShadow = "0px 0px 0px 1000000px rgba(0, 0, 0, 0.5)";

        userIconI.style.opacity = 0; // Fade Out
        userIconI.style.transform = "rotate(180deg)"; // Rotate To 180 Degrees
        setTimeout(() => {
            userIconI.className = "fa-solid fa-close"; // Change Icon
            userIcon.style.color = "white"; // Change Color
            userIconI.style.opacity = 100; // Fade In
            userIconI.style.transform = "rotate(360deg)"; // Rotate To 0 Degrees
        }, 300);


        setTimeout(() => {
            isOpen = true;
        }, 500);

    }

}

function Scroll() {

    // check for the scroll height of the window

    if (window.scrollY > 50) {

        userIcon.style.top = "3px";

    } else {
        userIcon.style.top = "10px";
    }

}

function checkForClicks(inputObject) {

    let clickedOnSidebar = false;

    for (let i = 0; i < inputObject.path.length; i++) {

        currentElement = inputObject.path[i];

        if (currentElement.id == "sidebar-container") {

            clickedOnSidebar = true;

        }

    }

    if (!clickedOnSidebar) {

        // If Didnt Click On SideBar
        if (window.innerWidth < 768 && isOpen) {
            ToggleMenu();
        }

    }

}