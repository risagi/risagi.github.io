const box = document.getElementById('lightbox');
if (box) {
  const big = box.querySelector('img');
  document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => {
      big.src = img.src;
      box.classList.add('open');
    });
  });
  box.addEventListener('click', () => box.classList.remove('open'));
}
