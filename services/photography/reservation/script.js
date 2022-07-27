function FormatPrice(input) {

    input = input.toString();

    if (input.length <= 3) {
        return input + " تومان";
    }

    const inputLen = input.length;
    const parts = Math.floor(inputLen / 3);
    const remainder = inputLen % 3;
    let strings = [];
    let remainders = input.substr(0, remainder);

    for (let i = 0; i < parts; i++) {
        let startingPoint = -((i + 1) * 3);
        if (remainder == 0 && i == parts - 1) {
            strings[i] = input.substr(startingPoint, 3);
        } else {
            strings[i] = "," + input.substr(startingPoint, 3);
        }
    }

    input = remainders;

    for (let i = strings.length - 1; i >= 0; i--) {
        const string = strings[i];
        input += string;
    }

    return input + " تومان";

}

function AnimatePrice(numberOf, specialValue) {
    let actualPrice = valueOf * numberOf + specialValue;
    let formattedPrice = FormatPrice(actualPrice);
    DisplayPrice(formattedPrice);
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

function DisplayPrice(number) {
    
    document.querySelector("#price").innerText = number;

}

const valueOf = 40000;
let animatedPrice = 0;

const inputs = {
    numOfPhotos: null,
    photoType: null,
    city: null,
    areNull: true,
    mazanSelected: false,
    commercialSelected: false,
    photoNumInput: document.querySelector("input[name='number-of-photos']"),
    photoTypeInput: document.querySelector("select[name='photo-type']"),
    photoCityInput: document.querySelector("select[name='city']"),

    photoTypeInputOptions: {
        portrait: document.querySelector("option[value=پرتره]"),
        commercial: document.querySelector("option[value=تبلیغاتی]"),
    },
    photoCityInputOptions: {
        tehran: document.querySelector("option[value=تهران]"),
        mazandaran: document.querySelector("option[value=مازندران]"),
    },

    Update: function () {
        
        if (this.photoCityInput.value === this.photoCityInputOptions.mazandaran.value) {
            // Mazandaran Is Selected
            // Disable The Portrait Option
            this.photoTypeInputOptions.portrait.disabled = true;
            // Change The Portrait Option To Commercial
            this.photoTypeInput.value = this.photoTypeInputOptions.commercial.value;
        } else {
            // Tehran Is Selected
            // Enable The Portrait Option
            this.photoTypeInputOptions.portrait.disabled = false;
        }

        // Date
        const state = date.pDatePicker.model.state;
        console.log(state);

        // Assign All The Values
        this.numOfPhotos = this.photoNumInput.value;
        this.photoType = this.photoTypeInput.value;
        this.city = this.photoCityInput.value;
        
    },

    CheckForNull: function () {
        if (this.numOfPhotos == undefined || this.numOfPhotos == "" || this.photoType == undefined || this.photoType == "placeholder" || this.city == undefined || this.city == "placeholder") {
            this.areNull = true;
        } else {
            this.areNull = false;
        }
    }

};

function CalculateChanges() {

    inputs.Update();
    inputs.CheckForNull();

    if (inputs.areNull) {
        return;
    }

    AnimatePrice(inputs.numOfPhotos, 0);

}
