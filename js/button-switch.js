document.querySelector('.button').addEventListener('click', function () {
  const button = this;
  const text = button.querySelector('.text');
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
});

document.addEventListener('mousemove', function (e) {
  const button = document.querySelector('.button');
  if (button.classList.contains('disable')) {
    // Glitch effect for 'disable' state
    button.querySelector('.glitch').style.opacity = 1;
    button.querySelector('.text::before').style.opacity = 1;
  } else {
    const rect = button.getBoundingClientRect();
    const isInButton =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
    // Glitch effect for 'enable' state
    button.querySelector('.glitch').style.opacity = isInButton ? 1 : 0;
    button.querySelector('.text::before').style.opacity = isInButton ? 1 : 0;
  }
});
