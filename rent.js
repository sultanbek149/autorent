const rent = document.querySelector('#rent')

const presentRent = document.querySelector('.present-rent')
const presentCity = document.querySelector('.present-city')
const presentRentData = document.querySelector('.present-rentData')
const presentRentCars = document.querySelector('.present-rentCars')
const presentCarModel = document.querySelector('.present-rentModels')



rent.addEventListener('click', () => {
    presentRent.classList.toggle('active')
})

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
})

const backFromRentCars = document.querySelector('.present-rentCars .back')
backFromRentCars.addEventListener('click', () => {
    presentRentCars.classList.toggle('active')
})

const backFromRentModels = document.querySelector('.present-rentModels .back')
backFromRentModels.addEventListener('click', () => {
    presentCarModel.classList.toggle('active')
})

const rentServices = document.querySelectorAll('.servicesRent .item')
let rentService = ''

rentServices.forEach(el => {
    el.addEventListener('click', () => {
        rentService = el.innerText
        presentCity.classList.toggle('active')
    })
})

const rentCities = document.querySelectorAll('.cityRent .item')
let rentCity = ''


rentCities.forEach(el => {
    el.addEventListener('click', () => {
        rentCity = el.innerText
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









