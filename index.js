const addPairForm = document.forms['addPair'];
const newPairInput = document.getElementsByClassName('newPair')[0];
const error = document.getElementsByClassName('errorInput')[0];
const ol = document.getElementsByClassName('ol')[0];
const buttonSortName = document.getElementsByClassName('sortName')[0];
const buttonSortValue = document.getElementsByClassName('sortValue')[0];
const buttonDel = document.getElementsByClassName('delete')[0];
const listDiv = document.getElementsByClassName('list')[0];

let pairsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(pairsArray));
const data = JSON.parse(localStorage.getItem('items'));
data.forEach(item => {
    const li = document.createElement('li');
    li.innerText = item;
    return ol.append(li);
})

//когда input пустой пропадает ранее выбитая ошибка
newPairInput.addEventListener('input', function () {
    if (this.value.length === 0) {
        error.innerText = '';
    }
});

addPairForm.onsubmit = function (ev) {
    ev.preventDefault();
    if (newPairInput.value) {
        const newPair = newPairInput.value;
        const data1 = JSON.parse(localStorage.getItem('items'));
        for (const i of newPair) {
            if (i === '=') {//пропускает если хоть один из введенных символов равен =
                error.innerText = '';
                const pairSplit = newPair.split('=');//разделяем значение знако =
                const pairNoSplitNoSpace = `${pairSplit[0].trim()}${pairSplit[1].trim()}`;//создаем одно стринговое значение для ее итерации
                for (const m of pairNoSplitNoSpace) {
                    if (!/[0-9 a-zа-яА-ЯA-Z]/.test(m)) {//проверяем каждый символ значения на соответствие указанным параметрам
                        return error.innerText = new Error('Can contain only alpha-numeric characters. The equal-sign is used to delimit the pair.');
                    }
                }
                const pairNoSpace = `${pairSplit[0].trim()}=${pairSplit[1].trim()}`;
                for (const d of data1) {//проверяем на уникальность
                    if (pairNoSpace === d) {
                        return error.innerText = new Error('This value is already in the lists');
                    }
                }
                pairsArray.push(pairNoSpace);
                localStorage.setItem('items', JSON.stringify(pairsArray));//записваем в память
                const li = document.createElement('li');//передаем данные в DIV
                li.innerText = pairNoSpace;
                return ol.prepend(li);
            } else {//если в значении input нет знака =
                error.innerText = new Error('The value must contain the "=" separator.');
            }
        }
    }
}

buttonSortName.onclick = function () {
    const li = document.querySelectorAll('li');
    li.forEach(elem => elem.remove());//очищаем списки
    const sortNameArrCopy = JSON.parse(localStorage.getItem('items'));//берем данныеиз памяти
    const sortNameArr = sortNameArrCopy.sort();
    localStorage.setItem('items', JSON.stringify(sortNameArr));//перезаписываем их с изменеиями
    sortNameArr.forEach(item => {//переносим в DIV
        const li = document.createElement('li');
        li.innerText = item;
        ol.append(li);
    })
}

const fh = [];
const kh = [];

buttonSortValue.onclick = function () {
    fh.length = 0;
    kh.length = 0;
    const li = document.querySelectorAll('li');
    li.forEach(elem => elem.remove());
    const sortValueArrCopy = JSON.parse(localStorage.getItem('items'));
    for (const valueForSplit of sortValueArrCopy) {
        const valueSplit = valueForSplit.split('=');
        const valueNoSpace = `${valueSplit[1].trim()}=${valueSplit[0].trim()}`;
        fh.push(valueNoSpace);
    }
    const sortValueArr = fh.sort();
    for (const valueForLiEnd of sortValueArr) {
        const valueSplitEnd = valueForLiEnd.split('=');
        const valueNoSpaceEnd = `${valueSplitEnd[1].trim()}=${valueSplitEnd[0].trim()}`;
        kh.push(valueNoSpaceEnd);
    }
    localStorage.setItem('items', JSON.stringify(kh));
    kh.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        return ol.append(li);
    })
}

const del = [];

listDiv.onmousemove = function () {
    const listCl = document.querySelectorAll('li');
    for (const list of listCl) {
        list.onclick = function () {
            if (list.style.backgroundColor === 'lightblue') {
                const delNo = del.filter(item => item !== list.innerText);
                del.length = 0;
                delNo.forEach(item => del.push(item));
                list.style.backgroundColor = 'white';
            } else {
                del.push(list.innerText);
                list.style.backgroundColor = 'lightblue';
            }
        }
    }
}

const arrIfDel = [];

buttonDel.onclick = function () {
    arrIfDel.length = 0;
    const li = document.querySelectorAll('li');
    li.forEach(elem => elem.remove());
    const deleteArrCopy = JSON.parse(localStorage.getItem('items'));
    deleteArrCopy.forEach(elem => arrIfDel.push(elem));
    let common = del.filter(x => arrIfDel.includes(x));
    del.length = 0;
    let good = arrIfDel.filter(x => !common.includes(x));
    localStorage.setItem('items', JSON.stringify(good));
    const data111 = JSON.parse(localStorage.getItem('items'));
    data111.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        return ol.append(li);
    })
}
