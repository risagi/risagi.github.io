const box = document.getElementById('lightbox');
if (box) {
  const big = box.querySelector('img');
  document.querySelectorAll('.gallery img, .carousel img').forEach(img => {
    img.addEventListener('click', () => {
      big.src = img.src;
      box.classList.add('open');
    });
  });
  box.addEventListener('click', () => box.classList.remove('open'));
}

document.querySelectorAll('.carousel-wrap').forEach(wrap => {
  const track = wrap.querySelector('.carousel');
  const step = () => track.clientWidth * 0.8;
  wrap.querySelector('.prev').addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  wrap.querySelector('.next').addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
});
