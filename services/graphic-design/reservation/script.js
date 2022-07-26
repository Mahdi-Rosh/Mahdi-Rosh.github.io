class PriceDisplay {

    constructor(valueOf, animationSpeed, animationEase, priceElem) {
        this.animationSpeed = animationSpeed;
        this.animationEase = animationEase;
        this.priceElem = document.querySelector(priceElem);

        this.valueOf = valueOf;
        this.animatedPrice = 0;
    }

    DisplayMessage(message) {
        this.priceElem.innerHTML = message;
    }

    DisplayPrice(input) {
        input = this.FormatPrice(input);
        this.priceElem.innerHTML = input;
    }

    FormatPrice(input) {

        input = input.toString();

        if (input.length <= 3) {
            return input + " تومان";
        }

        const inputLen = input.length;
        const parts = Math.floor(inputLen / 3);
        const remainder = inputLen % 3;
        let strings = [];
        let remainders = input.substr(0, remainder);

        console.log("Input Number : " + input);
        console.log("Length : " + inputLen);
        console.log("Number Of Parts : " + parts);
        console.log("Remainder : " + remainder);
        console.log("Remainder String : " + remainders);

        for (let i = 0; i < parts; i++) {
            let startingPoint = -((i + 1) * 3);
            if (remainder == 0 && i == parts - 1) {
                strings[i] = input.substr(startingPoint, 3);
            } else {
                strings[i] = "," + input.substr(startingPoint, 3);
            }
            console.log("Starting Point : " + startingPoint);
        }

        input = remainders;

        for (let i = strings.length - 1; i >= 0; i--) {
            const string = strings[i];
            input += string;
            console.log("Index : " + i);
        }

        console.log(strings);

        return input + " تومان";

    }

    AnimatePrice(numberOf, specialValue) {
        let actualPrice = this.valueOf * numberOf + specialValue;
        this.DisplayPrice(actualPrice);
        // let animatedPrice = this.animatedPrice;
        // let offset = 0.4;

        // let intervalID = setInterval(() => {

        //     if (animatedPrice < (actualPrice - offset)) {
        //         // Animated Price Has To Increase
        //         // Increase Price
        //         let priceDiffrence = actualPrice - animatedPrice;
        //         animatedPrice += (priceDiffrence / this.animationSpeed) + this.animationEase;
        //         let priceToDisplay = Math.round(animatedPrice);
        //         this.DisplayPrice(priceToDisplay);

        //     } else if (animatedPrice > (actualPrice + offset)) {
        //         // Animated Price Has To Decrease
        //         // Decrease Price
        //         console.log("decreasing price...");
        //         let priceDiffrence = animatedPrice - actualPrice;
        //         console.log("price Diffrence : " + priceDiffrence);
        //         animatedPrice -= (priceDiffrence / this.animationSpeed) + this.animationEase;
        //         let priceToDisplay = Math.round(animatedPrice);
        //         this.DisplayPrice(priceToDisplay);

        //     } else {
        //         // Animated Price Is Equal To The Actual Price, Stop The Interval
        //         clearInterval(intervalID);
        //     }

        // }, 50);
    }

}
const Price = new PriceDisplay(40000, 8, 0.1, "#price");

const portraitOption = document.querySelector("option[value=portrait]");
const commercialOption = document.querySelector("option[value=commercial]");

const inputValues = {
    numOfPhotos: null,
    photoType: null,
    city: null,
    areNull: true,
    mazanSelected: false,
    commercialSelected: false,
    photoNumInput: document.querySelector("input[name='photo-num']"),
    photoTypeInput: document.querySelector("select[name='photo-type']"),
    photoCityInput: document.querySelector("select[name='photo-city']"),

    UpdateInputs: function() {
        this.numOfPhotos = this.photoNumInput.value;
        this.photoType = this.photoTypeInput.value;
        this.city = this.photoCityInput.value;
        if (this.numOfPhotos == undefined || this.numOfPhotos == "" || this.photoType == undefined || this.photoType == "placeholder" || this.city == undefined || this.city == "placeholder") {
            this.areNull = true;
        } else {
            this.areNull = false;
        }

        if (this.city == "mazandaran") {
            this.mazanSelected = true;
        } else {
            this.mazanSelected = false;
        }

        if (this.photoType == "commercial") {
            this.commercialSelected = true;
        } else {
            this.commercialSelected = false;
        }
    },

    CheckForNull: function() {
        if (this.numOfPhotos == undefined || this.numOfPhotos == "" || this.photoType == undefined || this.photoType == "placeholder" || this.city == undefined || this.city == "placeholder") {
            this.areNull = true;
        } else {
            this.areNull = false;
        }
    }

};

function CalculateChanges() {

    inputValues.UpdateInputs();

    if (inputValues.mazanSelected) {
        portraitOption.setAttribute("disabled", "true");
        commercialOption.setAttribute("selected", "true");
        inputValues.UpdateInputs();
    } else {
        portraitOption.removeAttribute("disabled");
        commercialOption.removeAttribute("selected");
    }

    if (!inputValues.areNull) {

        console.clear();
        console.log(inputValues.numOfPhotos);
        console.log(inputValues.photoType);
        console.log(inputValues.city);
        console.log(inputValues.mazanSelected);
        if (inputValues.commercialSelected) {
            Price.DisplayMessage("قیمت عکاسی تبلیغاتی متغیر میباشد");
        } else {
            Price.AnimatePrice(inputValues.numOfPhotos, 0);
        }

    }

}