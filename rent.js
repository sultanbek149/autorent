const rent = document.querySelector('#rent')
const forrent = document.querySelector('#forrent')

const rent2 = document.querySelector('#rent2')
const forrent2 = document.querySelector('#forrent2')


const presentRent = document.querySelector('.present-rent')
const presentCity = document.querySelector('.present-city')
const presentRentData = document.querySelector('.present-rentData')
const tbarTitleRentData = document.querySelector('.present-rentData .tbar-title')
const presentRentCars = document.querySelector('.present-rentCars')
const presentCarModel = document.querySelector('.present-rentModels')
const presentOtherServices = document.querySelector('.present-otherServices')

const presentRentFor = document.querySelector('.present-rentFor')

let serviceStatus = ''

rent.addEventListener('click', () => {
    presentRent.classList.toggle('active')
    serviceStatus = 'rent'
    presentRent.querySelector('.tbar-title').textContent = "Что хотите арендовать?"
})

rent2.addEventListener('click', () => {
    presentRent.classList.toggle('active')
    serviceStatus = 'rent'
    presentRent.querySelector('.tbar-title').textContent = "Что хотите арендовать?"
})

forrent.addEventListener('click', () => {
    presentRent.classList.toggle('active')
    serviceStatus = 'rentFor'
    presentRent.querySelector('.tbar-title').textContent = "Что хотите сдать под аренду?"
})

forrent2.addEventListener('click', () => {
    presentRent.classList.toggle('active')
    serviceStatus = 'rentFor'
    presentRent.querySelector('.tbar-title').textContent = "Что хотите сдать под аренду?"
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

        if (serviceStatus === "rentFor") {
            presentRentFor.classList.toggle('active')
        } else {
            if (rentService.id === 'cars') {
                tbarTitleRentData.textContent = 'Выберите машину'
                presentRentData.querySelector("[data-service='cars']").style.display = 'inline'
                document.querySelectorAll(`[data-service=${rentService.id}] .serviceInp`).forEach(el => el.required = true)
            }
            if (rentService.id === 'gruz') {
                tbarTitleRentData.textContent = 'Грузовые и Спецтехника'
                presentRentData.querySelector("[data-service='gruz']").style.display = 'inline'
                document.querySelectorAll(`[data-service=${rentService.id}] .serviceInp`).forEach(el => el.required = true)
            }
            if (rentService.id === 'equipments') {
                tbarTitleRentData.textContent = 'Оборудование и инструменты'
                presentRentData.querySelector("[data-service='equipments']").style.display = 'inline'
                document.querySelectorAll(`[data-service=${rentService.id}] .serviceInp`).forEach(el => el.required = true)
            }
            if (rentService.id === 'otherServices') {
                tbarTitleRentData.textContent = 'Услуги'
                presentRentData.querySelector("[data-service='otherServices']").style.display = 'inline'
            }
            presentRentData.classList.toggle('active')

        }

    })
})

const picker = new Litepicker({
    element: document.querySelector('#dateRange'),
    delimiter: "  -  ",
    format: "DD.MM.YYYY",
    lang: "ru-RU",
    minDate: new Date() - 1
});

const rentForForm = document.querySelector('#rentForForm')
const username = document.querySelector('#name')
const phoneFor = document.querySelector('#phoneFor')
rentForForm.addEventListener('submit', (e) => {
    e.preventDefault()
    sendMessage()
    window.location.href = "thanks.html";
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
                // inputCarModel.focus()
                // inputCarModel.select()
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
    inputSearchCar.focus()
    inputSearchCar.select()
    cars.forEach(car => car.element.classList.remove('hide'))
})

inputSearchCar.addEventListener('input', e => {
    const value = e.target.value.toLowerCase()
    cars.forEach(car => {
        let isVisible = car.name.toLowerCase().includes(value)
        car.element.classList.toggle('hide', !isVisible)
    })
})

const inputSearchCarModel = document.querySelector('#searchCarModel')

let carModels = []
const inputCarModel = document.querySelector('#carModel')
inputCarModel.addEventListener('click', () => {
    presentCarModel.classList.toggle('active')
    inputSearchCarModel.value = ""
    inputSearchCarModel.focus()
    inputSearchCarModel.select()    
    carModels.forEach(carModel => carModel.element.classList.remove('hide'))

    const url = `https://cars-base.ru/api/cars/${carId}`;
    const listRent = document.querySelector('.present-rentModels .listRent')

    listRent.innerHTML = ''

    fetch(url)
        .then(res => res.json())
        .then(data => {
            // Processing the fetched data
            console.log(data)
            carModels = data.map(el => {
                const listItem = document.createElement('div');
                listItem.classList.add('item')

                const span = document.createElement('span');
                span.textContent = el.id

                listItem.appendChild(span);
                listRent.appendChild(listItem)

                listItem.addEventListener('click', () => {
                    // carModelId = el.id
                    backFromRentModels.click()
                    inputCarModel.value = el.name
                    dateRange.focus()
                    dateRange.select()
                })

                return { name: el.name, id: el.id, element: listItem }
            })
            
        })
        .catch(error => {
            // Handling errors
            console.error('Error fetching data:', error);
        });
})

inputSearchCarModel.addEventListener('input', e => {
    const value = e.target.value.toLowerCase()
    carModels.forEach(carModel => {
        let isVisible = carModel.name.toLowerCase().includes(value)
        carModel.element.classList.toggle('hide', !isVisible)
    })
})

const inputOtherService = document.querySelector('#otherServicesInput')
const itemsOtherServices = document.querySelectorAll('[data-otherService]')
inputOtherService.addEventListener('click', () => {
    presentOtherServices.classList.add('active')
})

itemsOtherServices.forEach(item => {
    item.addEventListener('click', () => {
        inputOtherService.value = item.querySelector('span').textContent
        backFromOtherServices.click()
    })
})

const rentForm = document.querySelector('#rentForm')
rentForm.addEventListener('submit', (e) => {
    e.preventDefault()
    sendMessage()
    window.location.href = "thanks.html";
})

const phone = document.querySelector('#phone')
const dateRange = document.querySelector('#dateRange')
const gruzTextarea = document.querySelector('#gruzTextarea')
const equipmentsTextarea = document.querySelector('#equipmentsTextarea')
const modal = document.querySelector('#open-modal')



const sendMessage = () => {

    // const t = "6569603838:AAF_gfsCWK5fughj7bevQswTyn4ruxq1t8g"
    // const cid = -1002112977648
    // const url = `https://api.telegram.org/bot${t}/sendMessage?chat_id=${cid}&text=${text}&parse_mode=html`

    let t
    let cid
    let text

    if (rentService.id === 'cars') {
        t = "6435795574:AAHDuWdPQpcNI3yPekGjbV1GRPU7SRFw4Q4"
        cid = -4135021717

        if (serviceStatus === 'rentFor') {
            text = `<b>Данные с сайта:</b> %0A<b>Статус:</b> Cдать под Аренду %0A<b>Вид услуги:</b> ${rentService.name} %0A<b>Город:</b> ${rentCity}%0A<b>Имя:</b> ${username.value} %0A<b>Телефон:</b> ${phoneFor.value}`
        } else {
            text = `<b>Данные с сайта:</b> %0A<b>Статус:</b> Арендовать %0A<b>Вид услуги:</b> ${rentService.name}%0A<b>Марка машины:</b> ${inputCarName.value}%0A<b>Модель машины:</b> ${inputCarModel.value}%0A<b>Период Аренды:</b> ${dateRange.value} %0A<b>Город:</b> ${rentCity}%0A<b>Телефон:</b> ${phone.value}`
        }
    }

    if (rentService.id === 'gruz') {
        t = "7008339608:AAHqtjexxE5IIOPcWUmNIx0hew-Ujsow7tM"
        cid = -4144342640

        if (serviceStatus === 'rentFor') {
            text = `<b>Данные с сайта:</b> %0A<b>Статус:</b> Cдать под Аренду %0A<b>Вид услуги:</b> ${rentService.name}%0A<b>Город:</b> ${rentCity}%0A<b>Телефон:</b> ${phoneFor.value}`
        } else {
            text = `<b>Данные с сайта:</b> %0A<b>Статус:</b> Арендовать %0A<b>Вид услуги:</b> ${rentService.name}%0A<b>Описание услуги:</b> ${gruzTextarea.value}%0A<b>Период Аренды:</b> ${dateRange.value} %0A<b>Город:</b> ${rentCity}%0A<b>Телефон:</b> ${phone.value}`
        }
    }

    if (rentService.id === 'equipments') {
        t = "7052202621:AAF7zSQ8VyoHvezFID4nGzckl-ffSgxzrNU"
        cid = -4108676653

        if (serviceStatus === 'rentFor') {
            text = `<b>Данные с сайта:</b> %0A<b>Статус:</b> Cдать под Аренду %0A<b>Вид услуги:</b> ${rentService.name}%0A<b>Город:</b> ${rentCity}%0A<b>Телефон:</b> ${phoneFor.value}`
        } else {
            text = `<b>Данные с сайта:</b> %0A<b>Статус:</b> Арендовать %0A<b>Вид услуги:</b> ${rentService.name}%0A<b>Описание услуги:</b> ${equipmentsTextarea.value}%0A<b>Период Аренды:</b> ${dateRange.value}  %0A<b>Город:</b> ${rentCity}%0A<b>Телефон:</b> ${phone.value}`
        }
    }

    if (rentService.id === "otherServices") {
        t = "6617014775:AAEGiauFSfXcmIw8u--oJTKbxelQf26tNpA"
        cid = -4123367316

        if (serviceStatus === 'rentFor') {
            text = `<b>Данные с сайта:</b> %0A<b>Статус:</b> Cдать под Аренду %0A<b>Вид услуги:</b> ${rentService.name}%0A<b>Город:</b> ${rentCity}%0A<b>Телефон:</b> ${phoneFor.value}`
        } else {
            text = `<b>Данные с сайта:</b> %0A<b>Статус:</b> Арендовать %0A<b>Вид услуги:</b> ${rentService.name}%0A<b>Описание услуги:</b> ${inputOtherService.value}%0A<b>Период Аренды:</b> ${dateRange.value}  %0A<b>Город:</b> ${rentCity}%0A<b>Телефон:</b> ${phone.value}`
        }
    }

    picker.clearSelection()


    console.log(text);


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

    document.querySelectorAll('[data-present]').forEach(el => el.classList.remove('active'))
}

const reset = () => {
    document.querySelectorAll('.serviceInp').forEach(el => el.value = '')
    document.querySelectorAll(`[data-service=${rentService.id}] .serviceInp`).forEach(el => el.required = false)
    if (rentService.id === 'cars') {
        carModelField.classList.toggle('hide')
    }
    presentRentData.querySelector(`[data-service="${rentService.id}"]`).style.display = 'none'

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
    document.querySelectorAll(`[data-service=${rentService.id}] .serviceInp`).forEach(el => el.required = false)
    document.querySelectorAll('.serviceInp').forEach(el => el.value = '')

    carModels = []
    carModelField.classList.toggle('hide')

})

const backFromRentCars = document.querySelector('.present-rentCars .back')
backFromRentCars.addEventListener('click', () => {
    presentRentCars.classList.toggle('active')
})

const backFromRentModels = document.querySelector('.present-rentModels .back')
backFromRentModels.addEventListener('click', () => {
    presentCarModel.classList.toggle('active')
})

const backFromRentFor = document.querySelector('.present-rentFor .back')
backFromRentFor.addEventListener('click', () => {
    presentRentFor.classList.toggle('active')
    document.querySelectorAll('.serviceInp').forEach(el => el.value = '')
})

const backFromOtherServices = document.querySelector('.present-otherServices .back')
backFromOtherServices.addEventListener('click', () => {
    presentOtherServices.classList.toggle('active')
})

