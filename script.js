// SIDEBAR (shows on every page)
const side = document.createElement('aside');
side.className = 'sidebar';
side.innerHTML = `
  <a class="logo" href="index.html">✦ Arissa's Portfolio</a>
  <img src="images/profile.png" alt="Arissa">
  <h3>Arissa binti Ahmad Fauzy</h3>
  <p class="muted">Class: English Major / Designer / Editor / Writer</p>
  <p>A final year student taking her Bachelor's Degree in English Language and Literature Studies. Passionate about video games, music, and playing games while listening to music.</p>

  <nav class="side-nav">
    <a href="index.html">Home</a>
    <a href="writing.html">Writing</a>
    <a href="thesis.html">Thesis</a>
    <a href="design.html">Graphic Design</a>
    <a href="video.html">Video Editing</a>
  </nav>

  <h4>Education</h4>
  <p><strong>BA English Language &amp; Literature (Hons)</strong><br>Management &amp; Science University<br><span class="muted">Feb 2024 – Feb 2027</span></p>
  <p><strong>Foundation in Arts</strong><br>Universiti Tun Abdul Razak<br><span class="muted">Jul 2022 – Feb 2023</span></p>

  <h4>Skills</h4>
  <ul class="tags">
    <li>Photoshop</li><li>DaVinci Resolve</li><li>CapCut</li><li>Canva</li>
    <li>Audacity</li><li>WordPress</li><li>Microsoft Office</li><li>Google Workspace</li>
  </ul>

  <h4>Languages</h4>
  <p>English (Fluent) · Malay (Fluent)</p>

  <h4>Contact</h4>
  <div class="side-links">
    <a class="btn" href="mailto:risafauzy13@gmail.com">Email</a>
    <a class="btn" href="https://www.linkedin.com/in/arissa-fauzy-095b7a439/">LinkedIn</a>
    <a class="btn" href="https://instagram.com/falloutarissa">Instagram</a>
  </div>
`;
document.body.prepend(side);
document.body.classList.add('has-side');

const page = location.pathname.split('/').pop() || 'index.html';
side.querySelectorAll('.side-nav a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

// LIGHTBOX
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

// CAROUSELS
document.querySelectorAll('.carousel-wrap').forEach(wrap => {
  const track = wrap.querySelector('.carousel');
  const step = () => track.clientWidth * 0.8;
  wrap.querySelector('.prev').addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  wrap.querySelector('.next').addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
});