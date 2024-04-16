const picker = new Litepicker({
    element: document.querySelector('#dateRange'),
    singleMode: false,
    delimiter: "  -  ",
    format: "DD.MM.YYYY",
    lang: "ru-RU",
    minDate: new Date() - 1
});



// new Picker(document.querySelector('.js-picker-from'), {
//     date: new Date(),
//     format: 'DD.MM.YYYY, HH',
//     rows: 5,
//     headers: true,
//     text: {
//         title: 'Выберите дату аренды',
//         cancel: 'Отменить',
//         confirm: 'Выбрать',
//         day: 'День',
//         month: 'Месяц',
//         year: 'Год',
//         hour: 'Час'
//     },
//     months: [
//         'Январь',
//         'Февраль',
//         'Март',
//         'Апрель',
//         'Май',
//         'Июнь',
//         'Июль',
//         'Август',
//         'Сентябрь',
//         'Октябрь',
//         'Ноябрь',
//         'Декабрь'
//     ],
//     monthsShort: [
//         'Янв',
//         'Фев',
//         'Мар',
//         'Апр',
//         'Май',
//         'Июн',
//         'Июл',
//         'Авг',
//         'Сен',
//         'Окт',
//         'Ноя',
//         'Дек',
//     ]
// });

// new Picker(document.querySelector('.js-picker-to'), {
//     date: new Date(),
//     format: 'DD.MM.YYYY, HH',
//     rows: 5,
//     headers: true,
//     text: {
//         title: 'Выберите дату аренды',
//         cancel: 'Отменить',
//         confirm: 'Выбрать',
//         day: 'День',
//         month: 'Месяц',
//         year: 'Год',
//         hour: 'Час'
//     },
//     months: [
//         'Январь',
//         'Февраль',
//         'Март',
//         'Апрель',
//         'Май',
//         'Июнь',
//         'Июль',
//         'Август',
//         'Сентябрь',
//         'Октябрь',
//         'Ноябрь',
//         'Декабрь'
//     ],
//     monthsShort: [
//         'Янв',
//         'Фев',
//         'Мар',
//         'Апр',
//         'Май',
//         'Июн',
//         'Июл',
//         'Авг',
//         'Сен',
//         'Окт',
//         'Ноя',
//         'Дек',
//     ]
// });