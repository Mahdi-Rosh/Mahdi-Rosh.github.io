const container = [];
const zoomElem = document.createElement("div");
zoomElem.id = "zoom";
document.body.appendChild(zoomElem);

document.body.addEventListener("click", (event) =>
{
    for (let i = 0; i < event.path.length; i++)
    {
        if (event.path[i] == container[0] || event.path[i] == zoomElem)
        {
            return;
        }
    }

    zoomElem.style.display = "none";
    zoomElem.innerHTML = "";
});

container[0] = document.createElement("div");
container[0].id = "menu";
document.body.appendChild(container[0]);

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function()
{
    if (this.readyState === 4 && this.status === 200)
    {
        const productsJSON = JSON.parse(this.responseText);
        console.log(productsJSON);
        container[1] = [];

        for (let i = 0; i < productsJSON.length; i++)
        {
            container[1][i] = MakeProductElement
            (
                productsJSON[i].name, String(productsJSON[i].price), productsJSON[i].image
            );

            container[1][i].addEventListener("click", (event) => 
            {
                console.log(container[1][i]);
                zoomElem.innerHTML = container[1][i].innerHTML;

                const pepsiSuggestion = MakeSuggestionElement("نوشابه", String(7000), "images/pepsi.png");


                console.log(pepsiSuggestion);
                zoomElem.appendChild(pepsiSuggestion);
                zoomElem.style.display = "block";
            });
            
            container[0].appendChild(container[1][i]);
        }
    }
}

xhr.open("GET", "products.json", true);
xhr.send();

function MakeProductElement(name, price, image)
{
    const elem = document.createElement("div");
    elem.className = "product";

    const imageElem = document.createElement("img");
    imageElem.src = image;
    
    const imageHolderElem = document.createElement("div");
    imageHolderElem.className = "image-holder";
    imageHolderElem.appendChild(imageElem);

    const nameElem = document.createElement("p");
    nameElem.innerText = name;
    const priceElem = document.createElement("p");
    priceElem.innerText = FormatPrice(price) + " تومان";

    elem.appendChild(imageHolderElem);
    elem.appendChild(nameElem);
    elem.appendChild(priceElem);

    return elem;
}

function MakeSuggestionElement(name, price, image)
{
    const elem = document.createElement("div");
    elem.className = "suggestion";

    const imageElem = document.createElement("img");
    imageElem.src = image;

    const imageHolderElem = document.createElement("div");
    imageHolderElem.className = "image-holder";
    imageHolderElem.appendChild(imageElem);

    const nameElem = document.createElement("p");
    nameElem.innerText = name;
    const priceElem = document.createElement("p");
    priceElem.innerText = FormatPrice(price) + " تومان";

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
