const container = [];

container[0] = document.createElement("div");
container[0].id = "menu";
document.body.appendChild(container[0]);

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function()
{
    if (this.readyState === 4 && this.status === 200)
    {
        console.log(this.responseText);
        const productsJSON = JSON.parse(this.responseText);
        console.log(productsJSON);
        container[1] = [];

        for (let i = 0; i < productsJSON.length; i++)
        {
            container[1][i] = MakeProductElement
            (
                productsJSON[i].name, FormatPrice(String(productsJSON[i].price)), productsJSON[i].image
            );
            container[0].appendChild(container[1][i]);
        }
    }
}

xhr.open("GET", "get-products.php", true);
xhr.send();

function MakeProductElement(productName, productPrice, productImage)
{
    const elem = document.createElement("div");
    elem.id = "product";

    const imageElem = document.createElement("img");
    imageElem.src = productImage;
    
    const imageHolderElem = document.createElement("div");
    imageHolderElem.id = "image-holder";
    imageHolderElem.appendChild(imageElem);

    const nameElem = document.createElement("p");
    nameElem.innerText = productName;
    const priceElem = document.createElement("p");
    priceElem.innerText = productPrice + " تومان";

    elem.appendChild(imageHolderElem);
    elem.appendChild(nameElem);
    elem.appendChild(priceElem);

    return elem;
}

function FormatPrice(price)
{
    const numberOfParts = Math.ceil(price.length / 3) - 1;
    const remainder = price.length - numberOfParts * 3;
    let strRemainder = price.substr(0, remainder);

    for (let i = 0; i < numberOfParts; i++)
    {
        strRemainder += "," + price.substr(-((i + 1) * 3), 3);
    }

    return strRemainder;
}
