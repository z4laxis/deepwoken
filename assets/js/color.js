const bgPicker = document.querySelector('.target');
const emblemPicker = document.querySelector('.target1');
const background = document.querySelector('.color');
const emblem1 = document.querySelector('.emblem1');
const emblem2 = document.querySelector('.emblem2');

const redlist1 = document.querySelector('.redlist1');
const greenlist1 = document.querySelector('.greenlist1');
const bluelist1 = document.querySelector('.bluelist1');

const redlist2 = document.querySelector('.redlist2');
const greenlist2 = document.querySelector('.greenlist2');
const bluelist2 = document.querySelector('.bluelist2');

const hexlist1 = document.querySelector('.hexlist1');
const hexlist2 = document.querySelector('.hexlist2');

function backgroundRGBUpdate() {
    background.style.backgroundColor = `rgb(${redlist1.value}, ${greenlist1.value}, ${bluelist1.value})`
}

function emblemRGBUpdate() {
    emblem1.style.backgroundColor = `rgb(${redlist2.value}, ${greenlist2.value}, ${bluelist2.value})`
    emblem2.style.backgroundColor = `rgb(${redlist2.value}, ${greenlist2.value}, ${bluelist2.value})`
}

function backgroundHEXUpdate() {
    background.style.backgroundColor = hexlist1.value
}

function emblemHEXUpdate() {
    emblem1.style.backgroundColor = hexlist2.value
    emblem2.style.backgroundColor = hexlist2.value
}

redlist1.addEventListener("change", backgroundRGBUpdate);
greenlist1.addEventListener("change", backgroundRGBUpdate);
bluelist1.addEventListener("change", backgroundRGBUpdate);

redlist2.addEventListener("change", emblemRGBUpdate);
greenlist2.addEventListener("change", emblemRGBUpdate);
bluelist2.addEventListener("change", emblemRGBUpdate);

hexlist1.addEventListener("change", backgroundHEXUpdate);
hexlist2.addEventListener("change", emblemHEXUpdate);

background.style.backgroundColor = bgPicker.value;
emblem1.style.backgroundColor = emblemPicker.value;
emblem2.style.backgroundColor = emblemPicker.value;

bgPicker.addEventListener('input', () => {
  background.style.backgroundColor = bgPicker.value;
});

emblemPicker.addEventListener('input', () => {
  emblem1.style.backgroundColor = emblemPicker.value;
  emblem2.style.backgroundColor = emblemPicker.value;
});

const lists = document.querySelectorAll('.emblem-list');
const list1 = lists[0];
const list2 = lists[1];

list1.addEventListener('click', e => {
  const img = e.target.closest('.emblem-btn img');
  if (!img) return;
  e.preventDefault();
  const src = img.getAttribute('src');
  list1.querySelectorAll('img.selected').forEach(b => b.classList.remove('selected'));
  img.classList.add('selected');
  const cssMask = `url('${src}')`;
  emblem1.style.webkitMaskImage = cssMask;
  emblem1.style.maskImage = cssMask;
  emblem1.style.backgroundColor = emblemPicker.value;
});

list2.addEventListener('click', e => {
  const img = e.target.closest('.emblem-btn img');
  if (!img) return;
  e.preventDefault();
  const src = img.getAttribute('src');
  list2.querySelectorAll('img.selected').forEach(b => b.classList.remove('selected'));
  img.classList.add('selected');
  const cssMask = `url('${src}')`;
  emblem2.style.webkitMaskImage = cssMask;
  emblem2.style.maskImage = cssMask;
  emblem2.style.backgroundColor = emblemPicker.value;
});

const clearLayer1 = document.getElementById('clearLayer1');
const clearLayer2 = document.getElementById('clearLayer2');

if (clearLayer1) {
  clearLayer1.addEventListener('click', () => {
    emblem1.style.webkitMaskImage = 'none';
    emblem1.style.maskImage = 'none';
    list1.querySelectorAll('img.selected').forEach(img => img.classList.remove('selected'));
  });
}

if (clearLayer2) {
  clearLayer2.addEventListener('click', () => {
    emblem2.style.webkitMaskImage = 'none';
    emblem2.style.maskImage = 'none';
    list2.querySelectorAll('img.selected').forEach(img => img.classList.remove('selected'));
  });
}