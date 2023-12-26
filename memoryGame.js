function mix(array) {
    for (i = 0; i <= array.length * 2; i++) {
        let num1 = Math.floor(Math.random() * array.length)
        let num2 = Math.floor(Math.random() * array.length)
        let temp = array[num1]
        array[num1] = array[num2]
        array[num2] = temp
    }
    return array
}
function clickValid(e) {
    e.target.classList.add('show');
    e.target.innerText = e.target.value;
}
function toggleShow(element) {
    element.classList.toggle('show')
}
function ifCouple(arrElement) {
    arrElement[0].classList.add('finding')
    arrElement[1].classList.add('finding')
    document.getElementsByClassName('playerNaw')[0].innerHTML += `<div class="cardPlayer">${arrElement[0].value} <div class="cardPlayer2 cardPlayer">${arrElement[0].value}</div></div>`
    toggleShow(arrElement[1])
    toggleShow(arrElement[0])
}
function ifNOTCouple(arrElement) {
    arrElement[0].innerText = ''
    arrElement[1].innerText = ''
    toggleShow(arrElement[1])
    toggleShow(arrElement[0])
    setTimeout(() => {
        for (p of document.getElementsByClassName('menu')) {
            p.classList.toggle('playerNaw')
        }
    }, 500);
}
function openingTwoCards(arrElement) {
    if (arrElement[0].value == arrElement[1].value) {
        ifCouple(arrElement)
    }
    else {
        ifNOTCouple(arrElement)
    }
}
function checkWin() {
    if (document.getElementsByClassName('finding').length == 10) {
        if(document.getElementsByClassName('menu')[0].children.length > document.getElementsByClassName('menu')[1].children.length){
            document.getElementsByClassName('win')[0].innerHTML = `player 1 \n won`
        }
        else{
            document.getElementsByClassName('win')[0].innerHTML = `player 2 \n won`
        }
        document.getElementsByClassName('win')[0].style.display = "flex";
        document.getElementsByClassName('newPlay')[0].style.display = "flex";
        return true
    }
    else { return false }
}
function click(e) {
    if (!checkWin()) {
        if (e.target.classList[1] != 'finding') {
            clickValid(e)
            let tor = document.getElementsByClassName('show')
            if (tor.length == 2) {
                setTimeout(() => {
                    openingTwoCards(tor);
                    setTimeout(() => {
                        checkWin()
                    },
                        100);
                }, 700);
            }
        }
    }
}
function createCard(v) {
    const board = document.getElementsByClassName('cards_container')[0]
    let card = document.createElement('div')
    card.classList.add('card')
    card.value = (v)
    card.innerText = ''
    card.onclick = click
    board.appendChild(card)
}
function createPlayer(a, b) {
    let player = document.getElementsByClassName('menu')
    for(m of player){
        m.classList = 'menu'
    }
    player[0].innerHTML = `<div class="namePlayer">${a}</div>`
    player[1].innerHTML = `<div class="namePlayer">${b}</div>`
    player[Math.random().toFixed(0)].classList.add('playerNaw')
}
document.getElementsByClassName('newPlay')[0].onclick = ()=>{
    document.getElementsByClassName('cards_container')[0].innerHTML = '';
    document.getElementsByClassName('win')[0].style.display = 'none';
    document.getElementsByClassName('newPlay')[0].style.display = 'none';
    init()}
function init() {
    const card = ['😁', '😎', '🥰', '🤩', '🤗']
    createPlayer('player 1', 'player 2')
    mix(card.concat(card)).forEach(v => createCard(v))
}
init()