let clickCount = 0;
let clickTimeout;
let is3DModelEnabled = true;

document.querySelector('.button').addEventListener('click', function () {
  const button = this;
  const text = button.querySelector('.text');

  clickCount++;
  clearTimeout(clickTimeout);

  if (clickCount === 2) {
    // Callback function for double click
    doubleClickCallback(button, text);
    clickCount = 0;
  } else {
    clickTimeout = setTimeout(() => {
      // Callback function for single click
      singleClickCallback(button, text);
      clickCount = 0;
    }, 300); // Reset click count after 300ms
  }
});

document.addEventListener('mousemove', function (e) {
  const button = document.querySelector('.button');
  const glitchElement = button.querySelector('.glitch');
  const textBeforeElement = button.querySelector('.text::before');

  if (button.classList.contains('disable')) {
    // Glitch effect for 'disable' state
    if (glitchElement) button.querySelector('.glitch').style.opacity = 1;
    if (textBeforeElement) button.querySelector('.text::before').style.opacity = 1;
  } else {
    const rect = button.getBoundingClientRect();
    const isInButton =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
    // Glitch effect for 'enable' state
    if (glitchElement) button.querySelector('.glitch').style.opacity = isInButton ? 1 : 0;
    if (textBeforeElement) button.querySelector('.text::before').style.opacity = isInButton ? 1 : 0;
  }
});

function singleClickCallback(button, text) {
  if (button.classList.contains('disable')) {
    // Reverse: Set 'disable' as 'enable'
    button.classList.remove('disable');
    button.classList.add('enable');
    text.setAttribute('data-text', 'Enable Glitch');
    text.textContent = 'Enable Glitch';
  } else {
    // Reverse: Set 'enable' as 'disable'
    button.classList.remove('enable');
    button.classList.add('disable');
    text.setAttribute('data-text', 'Disable Glitch');
    text.textContent = 'Disable Glitch';
  }
}

function doubleClickCallback(button, text) {
  console.log('Button was double-clicked!');
  if (is3DModelEnabled) {
    // Change the text to 'Enable Model'
    text.setAttribute('data-text', 'Enable Model');
    text.textContent = 'Enable Model';
  } else {
    // Restore the text to 'Enable Glitch' or 'Disable Glitch'
    if (button.classList.contains('disable')) {
      text.setAttribute('data-text', 'Disable Glitch');
      text.textContent = 'Disable Glitch';
    } else {
      text.setAttribute('data-text', 'Enable Glitch');
      text.textContent = 'Enable Glitch';
    }
  }
  is3DModelEnabled = !is3DModelEnabled;
}