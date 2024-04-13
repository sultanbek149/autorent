const rent = document.querySelector('#rent')
const forrent = document.querySelector('#forrent')

const presentRent = document.querySelector('.present-rent')
const presentCity = document.querySelector('.present-city')
const presentRentData = document.querySelector('.present-rentData')
const tbarTitleRentData = document.querySelector('.present-rentData .tbar-title')
const presentRentCars = document.querySelector('.present-rentCars')
const presentCarModel = document.querySelector('.present-rentModels')

let serviceStatus = ''

rent.addEventListener('click', () => {
    presentRent.classList.toggle('active')
    serviceStatus = 'Арендовать'
})

forrent.addEventListener('click', () => {
    serviceStatus = 'Сдать под Аренду'
})

const rentServices = document.querySelectorAll('.servicesRent .item')
let rentService = {}

rentServices.forEach((el, index) => {
    el.addEventListener('click', () => {
        rentService = { name: el.innerText, id: el.dataset.service }
        presentCity.classList.toggle('active')
    })
})

const rentCities = document.querySelectorAll('.cityRent .item')
let rentCity = ''


rentCities.forEach(el => {
    el.addEventListener('click', () => {
        rentCity = el.innerText
        if (rentService.id === 'cars') {
            tbarTitleRentData.textContent = 'Выберите машину'
            presentRentData.querySelector("[data-service='cars']").style.display = 'inline'
        }
        if (rentService.id === 'gruz') {
            tbarTitleRentData.textContent = 'Грузовые и Спецтехника'
            presentRentData.querySelector("[data-service='gruz']").style.display = 'inline'
        }
        if (rentService.id === 'instruments') {
            tbarTitleRentData.textContent = 'Оборудование и инструменты'
            presentRentData.querySelector("[data-service='instruments']").style.display = 'inline'
        }
        if (rentService.id === 'otherServices') {
            tbarTitleRentData.textContent = 'Услуги'
            // presentRentData.querySelector("[data-service='otherServices']").style.display = 'inline'
        }
        presentRentData.classList.toggle('active')

    })
})

const inputCarName = document.querySelector('#carName')
const carModelField = document.querySelector('.carModelField')

let cars = []
let carId

const url = 'https://cars-base.ru/api/cars';
fetch(url)
    .then(res => res.json())
    .then(data => {
        // Processing the fetched data
        const listRent = document.querySelector('.present-rentCars .listRent')

        cars = data.map(el => {
            const listItem = document.createElement('div');
            listItem.classList.add('item')
            const span = document.createElement('span');
            span.textContent = el.name
            listItem.appendChild(span)
            listRent.appendChild(listItem)


            listItem.addEventListener('click', () => {
                carId = el.id
                inputCarName.value = el.name
                if (carModelField) carModelField.classList.remove('hide')
                backFromRentCars.click()
            })

            return { name: el.name, id: el.id, element: listItem }
        })

    })
    .catch(error => {
        // Handling errors
        console.error('Error fetching data:', error);
    });

const inputSearchCar = document.querySelector('#searchCar')

inputCarName.addEventListener('click', () => {
    presentRentCars.classList.toggle('active')
    inputCarModel.value = ""
    inputSearchCar.value = ""
    cars.forEach(car => car.element.classList.remove('hide'))
})

inputSearchCar.addEventListener('input', e => {
    const value = e.target.value.toLowerCase()
    cars.forEach(car => {
        let isVisible = car.name.toLowerCase().includes(value)
        car.element.classList.toggle('hide', !isVisible)
    })
})


let carsModel = []
const inputCarModel = document.querySelector('#carModel')
inputCarModel.addEventListener('click', () => {
    presentCarModel.classList.toggle('active')

    const url = `https://cars-base.ru/api/cars/${carId}`;
    const listRent = document.querySelector('.present-rentModels .listRent')

    listRent.innerHTML = ''

    fetch(url)
        .then(res => res.json())
        .then(data => {
            // Processing the fetched data
            console.log(data)
            carsModel = data
            carsModel.forEach(el => {
                const listItem = document.createElement('div');
                listItem.classList.add('item')

                const span = document.createElement('span');
                span.textContent = el.name

                listItem.appendChild(span);
                listRent.appendChild(listItem)

                listItem.addEventListener('click', () => {
                    backFromRentModels.click()
                    inputCarModel.value = el.name
                })

            })
        })
        .catch(error => {
            // Handling errors
            console.error('Error fetching data:', error);
        });
})

const rentCarsForm = document.querySelector('#rentCarsForm')
rentCarsForm.addEventListener('submit', (e) => {
    e.preventDefault()
    sendMessage()
})

const phone = document.querySelector('#phone')
const fromDate = document.querySelector('#fromDate')
const toDate = document.querySelector('#toDate')

const sendMessage = () => {
    let text
    if (rentService.id === 'cars') {
        text = `Данные с сайта: %0A<b>Статус:</b> <i>${serviceStatus}</i> %0A <b>Вид услуги:</b> <i>${rentService.name}</i>%0A <b>Город:</b> <i>${rentCity}</i>%0A Марка машины: ${inputCarName.value}%0A Модель машины: ${inputCarModel.value}%0A От: ${fromDate.value} %0A До: ${toDate.value} %0A Телефон: ${phone.value} `
        document.querySelector(`[data-service=${rentService.id}`)
    }

    if (rentService.id === 'gruz') {
        text = `Данные с сайта: %0A<b>Статус:</b> <i>${serviceStatus}</i> %0A <b>Вид услуги:</b> <i>${rentService.name}</i>%0A <b>Город:</b> <i>${rentCity}</i>%0A Описание услуги: ${inputCarName.value}%0A От: ${fromDate.value} %0A До: ${toDate.value} %0A Телефон: ${phone.value} `
    }

    if (rentService.id === 'instruments') {
        text = `Данные с сайта: %0A<b>Статус:</b> <i>${serviceStatus}</i> %0A <b>Вид услуги:</b> <i>${rentService.name}</i>%0A <b>Город:</b> <i>${rentCity}</i>%0A Описание услуги: ${inputCarName.value}%0A От: ${fromDate.value} %0A До: ${toDate.value} %0A Телефон: ${phone.value} `
    }

    if (rentService.id === "otherServices") {
        // const text = `Данные с сайта: %0A<b>Статус:</b> <i>${serviceStatus}</i> %0A <b>Вид услуги:</b> <i>${rentService.name}</i>%0A <b>Город:</b> <i>${rentCity}</i>%0A Марка машины: ${inputCarName.value}%0A Модель машины: ${inputCarModel.value}%0A От: ${fromDate.value} %0A До: ${toDate.value} %0A Телефон: ${phone.value} `
    }

    console.log(text);

    // const t = "6569603838:AAF_gfsCWK5fughj7bevQswTyn4ruxq1t8g"
    // const cid = -1002112977648
    // const url = `https://api.telegram.org/bot${t}/sendMessage?chat_id=${cid}&text=${text}&parse_mode=html`

    const t = "6435795574:AAHDuWdPQpcNI3yPekGjbV1GRPU7SRFw4Q4"
    const cid = -4135021717
    const url = `https://api.telegram.org/bot${t}/sendMessage?chat_id=${cid}&text=${text}&parse_mode=html`

    const xhr = new XMLHttpRequest();

    // Handle the 'load' event for successful completion of the request    

    if (!window.navigator.onLine) return alert("Прошу проверьте свое интернет соединение!!!")


    xhr.open("GET", url, true);
    xhr.send();

    // modal.classList.toggle('active')

    // setTimeout(() => {
    //     modal.classList.toggle('active')
    // }, 3000)

    // reset()
}


const backFromRent = document.querySelector('.present-rent .back')
backFromRent.addEventListener('click', () => {
    presentRent.classList.toggle('active')
})
const backFromRentCity = document.querySelector('.present-city .back')
backFromRentCity.addEventListener('click', () => {
    presentCity.classList.toggle('active')
})

const backFromRentData = document.querySelector('.present-rentData .back')
backFromRentData.addEventListener('click', () => {
    presentRentData.classList.toggle('active')
    presentRentData.querySelector(`[data-service="${rentService.id}"]`).style.display = 'none'
})

const backFromRentCars = document.querySelector('.present-rentCars .back')
backFromRentCars.addEventListener('click', () => {
    presentRentCars.classList.toggle('active')
})

const backFromRentModels = document.querySelector('.present-rentModels .back')
backFromRentModels.addEventListener('click', () => {
    presentCarModel.classList.toggle('active')
})