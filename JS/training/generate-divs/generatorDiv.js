const btn = document.querySelector('button');
const cont = document.querySelector('main');
let counter = 0;
const addDiv = function() {
    const div = document.createElement('div');
    div.textContent = counter + 1;
    cont.appendChild(div);
    counter++;
    if (counter % 5 == 0) {
        div.setAttribute("class", "circle");
    }
}
btn.addEventListener('click', addDiv);