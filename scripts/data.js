const content = document.getElementsByClassName('webc-scroll-content');

let str = '';
for (let i = 0; i < 50; i++) {
  str += `<li>${i + 1}</li>`;
}

Array.from(content).forEach(c => {
  c.innerHTML = str;
})