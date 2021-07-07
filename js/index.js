let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    load50(currentPage);
    createForm();
    formEventListender();
    pageEventListener()
});

function pageEventListener() {
    let nextPage = document.querySelector("#forward");
    let prevPage = document.querySelector("#back");
    nextPage.addEventListener('click', () => {
        if (currentPage < 20) {
            currentPage++
            load50(currentPage)
        } else {
            alert("You are on the last page already!")
        }
    });
    prevPage.addEventListener('click', () =>{
        if (currentPage > 1) {
            currentPage--
            load50(currentPage)
        } else {
            alert("You are on the first page already!")
        }
    })
    
}

function load50(page) {
    document.querySelector("#monster-container").innerHTML = "";
    fetch (`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(json => {
        for (monster in json) {
            renderMonster(json[monster]);
        }
    });
}

function createForm() {
    let formContainer = document.querySelector("#create-monster");

    let form = document.createElement("form");
    let nameField = document.createElement("input");
    let ageField = document.createElement("input");
    let descField = document.createElement("input");
    let submitButton = document.createElement("button");

    form.id = "createMonster";

    nameField.id = "nameField";
    nameField.type = "text";
    nameField.placeholder = "Name...";
    ageField.id = "ageField";
    ageField.type = "text";
    ageField.placeholder = "Age...";
    descField.id = "descField";
    descField.type = "text";
    descField.placeholder = "Bio..."
    submitButton.textContent = "Create Monster Button";
    submitButton.type = "submit";
    submitButton.form = "createMonster";

    form.append(nameField, ageField, descField, submitButton);
    formContainer.append(form);
}

function formEventListender() {
    document.querySelector("#createMonster").addEventListener("submit", (event) => {
        event.preventDefault();
        let monstSubmit = {};
        monstSubmit.name = event.target.nameField.value;
        monstSubmit.age = event.target.ageField.value;
        monstSubmit.description = event.target.descField.value;
        console.log("test");
        renderMonster(monstSubmit, "top");
    });
}

function renderMonster(monst, position="bottom"){
    let monstContainer = document.querySelector("#monster-container");
    let monstName = document.createElement('h1');
    let monstAge = document.createElement('p');
    let monstDesc = document.createElement('p');

    monstName.textContent = monst.name;
    monstAge.textContent = `Age: ${monst.age}`;
    monstDesc.textContent = `Bio: ${monst.description}`;

    if(position === "top") {
        monstContainer.prepend(monstName, monstAge, monstDesc);
    }
    else if(position === "bottom") {
        monstContainer.append(monstName, monstAge, monstDesc);
    }
}