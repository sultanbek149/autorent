const input = document.querySelector(".input-box");
input.onclick = function () {
    this.classList.toggle("open");
    let list = this.nextElementSibling;
    if (list.style.maxHeight) {
        list.style.maxHeight = null;
        list.style.boxShadow = null;
    } else {
        list.style.maxHeight = list.scrollHeight + "px";
        list.style.boxShadow =
            "0 1px 2px 0 rgba(0, 0, 0, 0.15),0 1px 3px 1px rgba(0, 0, 0, 0.1)";
    }
};

const rad = document.querySelectorAll(".radio");
const checkedRad = document.querySelector('.radio:checked');

input.innerHTML = checkedRad.nextElementSibling.querySelector('.name').innerHTML

rad.forEach((item) => {
    item.addEventListener("change", () => {
        input.innerHTML = item.nextElementSibling.querySelector('.name').innerHTML;
        input.click();
    });
});

const label = document.querySelectorAll(".label-select");


const form = document.querySelector('#form')

const username = document.querySelector('#username')
const phone = document.querySelector('#phone')

const city = document.querySelector('#city')
// const address = document.querySelector('#address')


form.addEventListener('submit', function (e) {
    e.preventDefault()
    sendMessage()
})


const modal = document.querySelector('#open-modal')

function sendMessage() {
    const typeOrder = input.innerText

    const text = `Данные с сайта: %0A<b>Имя:</b> <i>${username.value}</i> %0A<b>Телефон:</b> <i>${phone.value}</i>%0A<b>Вид услуги:</b> <i>${typeOrder}</i> %0A<b>Город:</b> <i>${city.value}</i>`

    //  %0A<b>Адрес:</b> <i>${address.value}</i>


    const t = "6569603838:AAF_gfsCWK5fughj7bevQswTyn4ruxq1t8g"
    const cid = -1002112977648
    const url = `https://api.telegram.org/bot${t}/sendMessage?chat_id=${cid}&text=${text}&parse_mode=html`


    const xhr = new XMLHttpRequest();

    // Handle the 'load' event for successful completion of the request    

    if (!window.navigator.onLine) return alert("Прошу проверьте свое интернет соединение!!!")


    xhr.open("GET", url, true);
    xhr.send();

    modal.classList.toggle('active')

    setTimeout(() => {
        modal.classList.toggle('active')
    }, 3000)

    reset()
}

function reset() {
    username.value = ""
    phone.value = ""
    city.value = ""
    // address.value = ""
}

const open = document.querySelector('#open')
const present = document.querySelector('.present')
const overlay = document.querySelector('.overlay')
const back = document.querySelector('.back')
const services = document.querySelectorAll('[data-service]')


open.addEventListener('click', () => {
    present.classList.toggle('active')
    overlay.style.display = 'block'
})

back.addEventListener('click', () => {
    present.classList.toggle('active')
    overlay.style.display = 'none'

    document.querySelector('#id11').checked = true
    input.innerHTML = document.querySelector('#id11').nextElementSibling.querySelector('.name').innerHTML;

})

services.forEach((item) => {
    item.addEventListener("click", () => {
        input.innerHTML = item.querySelector('.service').innerHTML;
        present.classList.toggle('active')
        overlay.style.display = 'none'


        input.click();
    });
});
