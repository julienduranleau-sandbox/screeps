import nameGenerator from '../helpers/nameGenerator'

for (let i = 0; i < 15; i++) {
    document.body.innerHTML += `<p>${nameGenerator.generate()}</p>`
}