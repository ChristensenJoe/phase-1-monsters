document.addEventListener('DOMContentLoaded', () => {
first50()


})

function first50() {
    fetch ("http://localhost:3000/monsters/?_limit=50")
    .then(res => res.json())
    .then(json => {
        for (monster in json) {
            renderMonster(json[monster])
        }
    })
}

function renderMonster(monst){
    let monstContainer = document.querySelector("#monster-container")
    let monstName = document.createElement('h1')
    let monstAge = document.createElement('p')
    let monstDesc = document.createElement('p')

    monstName.textContent = monst.name
    monstAge.textContent = `Age: ${monst.age}`
    monstDesc.textContent = `Bio: ${monst.description}`

    monstContainer.append(monstName, monstAge, monstDesc)




}