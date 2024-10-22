let nameValueMap = new Map();
let sortedMap;

let input = document.getElementById("input");
let addButton = document.getElementById("add_button");
let listContainer = document.getElementById("list_container");
let inputError = document.getElementById("input_error");
let sortByNameButton = document.getElementById("name_sort");
let sortByValueButton = document.getElementById("value_sort");
let deleteButton = document.getElementById("delete_button");
let xmlButton = document.getElementById("xml_button");
let modal = document.getElementById("modal");

let regex = new RegExp(/([\w, \d]+={1}[\w, \d]{0,}){1}/)

let createItem = (itemText) => {
    let div = document.createElement("div");

    div.classList.add("item");
    div.textContent = itemText;
    div.addEventListener("click", () => {
        div.classList.toggle("selected");
    })

    return div;
}

const clearListContainer = () => {
    listContainer.innerHTML = "";
}

const render = (map) => {
    map.forEach((v, k) => {
        listContainer.appendChild(createItem(`${k}=${v}`));
    })
}

addButton.addEventListener('click', () => {
    let value = input.value;

    if (!regex.test(value)) {
        inputError.textContent = "Entered wrong value!"
        return;
    };

    let inputArray = value.replace(" ", "").split("=");
    nameValueMap.set(inputArray[0], inputArray[1]);

    clearListContainer();
    render(nameValueMap);
    inputError.textContent = ""
});

sortByNameButton.addEventListener("click", () => {
    sortedMap = new Map([...nameValueMap.entries()].sort())
    clearListContainer();
    render(sortedMap);
})

sortByValueButton.addEventListener("click", () => {
    sortedMap = new Map([...nameValueMap.entries()].sort((a, b) => a[1] > b[1]));
    clearListContainer();
    render(sortedMap);
})

deleteButton.addEventListener("click", () => {
    let selectedItems = document.querySelectorAll(".selected");

    selectedItems.forEach(item => {
        let key = item.textContent.split("=")[0];
        nameValueMap.delete(key);
    })

    clearListContainer();
    render(nameValueMap);
})

xmlButton.addEventListener('click', () => {
    let xmlString = "<list>";
    nameValueMap.forEach((v, k) => {
        xmlString = xmlString.concat(`<item><key>${k}</key><value>${v}</value></item>`);
    })
    xmlString = xmlString.concat("</list>");

    modal.setAttribute("open", "")
    modal.textContent = xmlString;
})

document.body.addEventListener('click', (event) => {
    if (event.target !== modal && event.target !== xmlButton) {
        modal.removeAttribute("open");
    }
});