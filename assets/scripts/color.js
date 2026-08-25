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

const colorPickers = document.querySelectorAll('.colorpicker');

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function toHex(value) {
  return value.toString(16).padStart(2, '0');
}

function rgbToHex(r, g, b) {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgb(hex) {
  const clean = hex.replace(/[^0-9a-f]/gi, '').slice(0, 6);
  if (clean.length !== 6) return null;
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16)
  };
}

function hsvToRgb(h, s, v) {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r1 = 0;
  let g1 = 0;
  let b1 = 0;

  if (h < 60) {
    r1 = c; g1 = x;
  } else if (h < 120) {
    r1 = x; g1 = c;
  } else if (h < 180) {
    g1 = c; b1 = x;
  } else if (h < 240) {
    g1 = x; b1 = c;
  } else if (h < 300) {
    r1 = x; b1 = c;
  } else {
    r1 = c; b1 = x;
  }

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255)
  };
}

function rgbToHsv(r, g, b) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  let h = 0;

  if (delta !== 0) {
    if (max === rn) {
      h = ((gn - bn) / delta) % 6;
    } else if (max === gn) {
      h = (bn - rn) / delta + 2;
    } else {
      h = (rn - gn) / delta + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : delta / max;
  const v = max;
  return { h, s, v };
}

function createPicker(config) {
  const state = { h: 0, s: 1, v: 1 };
  const saturationBox = config.container.querySelector('.saturation');
  const brightnessBox = config.container.querySelector('.brightness');

  function applyColor() {
    const rgb = hsvToRgb(state.h, state.s, state.v);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

    config.rInput.value = rgb.r;
    config.gInput.value = rgb.g;
    config.bInput.value = rgb.b;
    config.hexInput.value = hex.slice(1);
    config.hiddenPicker.value = hex;
    config.applyPreview(hex);
  }

  function setFromRgb(r, g, b) {
    const hsv = rgbToHsv(clamp(r, 0, 255), clamp(g, 0, 255), clamp(b, 0, 255));
    state.h = hsv.h;
    state.s = hsv.s;
    state.v = hsv.v;
    applyColor();
  }

  function setFromHex(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return;
    setFromRgb(rgb.r, rgb.g, rgb.b);
  }

  function updateFromRgbInputs() {
    setFromRgb(
      Number(config.rInput.value) || 0,
      Number(config.gInput.value) || 0,
      Number(config.bInput.value) || 0
    );
  }

  function updateFromHexInput() {
    setFromHex(config.hexInput.value);
  }

  function startSaturationDrag(startEvent) {
    const move = event => {
      const point = event.touches ? event.touches[0] : event;
      const rect = saturationBox.getBoundingClientRect();
      const x = clamp(point.clientX - rect.left, 0, rect.width);
      const y = clamp(point.clientY - rect.top, 0, rect.height);

      state.h = (x / rect.width) * 360;
      state.s = 1 - (y / rect.height);
      applyColor();
    };

    const stop = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', stop);
      document.removeEventListener('touchmove', move);
      document.removeEventListener('touchend', stop);
    };

    move(startEvent);
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', stop);
    document.addEventListener('touchmove', move, { passive: false });
    document.addEventListener('touchend', stop);
  }

  function startBrightnessDrag(startEvent) {
    const move = event => {
      const point = event.touches ? event.touches[0] : event;
      const rect = brightnessBox.getBoundingClientRect();
      const y = clamp(point.clientY - rect.top, 0, rect.height);

      state.v = 1 - (y / rect.height);
      applyColor();
    };

    const stop = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', stop);
      document.removeEventListener('touchmove', move);
      document.removeEventListener('touchend', stop);
    };

    move(startEvent);
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', stop);
    document.addEventListener('touchmove', move, { passive: false });
    document.addEventListener('touchend', stop);
  }

  [config.rInput, config.gInput, config.bInput].forEach(input => {
    input.addEventListener('input', updateFromRgbInputs);
    input.addEventListener('change', updateFromRgbInputs);
  });
  config.hexInput.addEventListener('input', updateFromHexInput);
  config.hexInput.addEventListener('change', updateFromHexInput);

  saturationBox.addEventListener('mousedown', startSaturationDrag);
  saturationBox.addEventListener('touchstart', event => {
    event.preventDefault();
    startSaturationDrag(event);
  }, { passive: false });

  brightnessBox.addEventListener('mousedown', startBrightnessDrag);
  brightnessBox.addEventListener('touchstart', event => {
    event.preventDefault();
    startBrightnessDrag(event);
  }, { passive: false });

  config.hiddenPicker.addEventListener('input', () => setFromHex(config.hiddenPicker.value));

  setFromHex(config.hiddenPicker.value);
}

createPicker({
  container: colorPickers[0],
  rInput: redlist1,
  gInput: greenlist1,
  bInput: bluelist1,
  hexInput: hexlist1,
  hiddenPicker: bgPicker,
  applyPreview: color => {
    background.style.backgroundColor = color;
  }
});

createPicker({
  container: colorPickers[1],
  rInput: redlist2,
  gInput: greenlist2,
  bInput: bluelist2,
  hexInput: hexlist2,
  hiddenPicker: emblemPicker,
  applyPreview: color => {
    emblem1.style.backgroundColor = color;
    emblem2.style.backgroundColor = color;
  }
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
