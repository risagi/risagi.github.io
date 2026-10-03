// SIDEBAR (shows on every page)
const side = document.createElement('aside');
side.className = 'sidebar';
side.innerHTML = `
  <a class="logo" href="index.html">✦ Arissa's Portfolio</a>
  <img src="images/profile.png" alt="Arissa">
  <h3>Arissa binti Ahmad Fauzy</h3>
  <p class="muted">Class: English Major / Designer / Editor / Writer</p>
  <p>A final year student taking her Bachelor's Degree in English Language and Literature Studies. Passionate about video games, music, and playing games while listening to music.</p>

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

const topnav = document.createElement('nav');
topnav.className = 'topnav';
topnav.innerHTML = `
  <a href="index.html">Home</a>
  <a href="writing.html">Writing</a>
  <a href="thesis.html">Thesis</a>
  <a href="design.html">Graphic Design</a>
  <a href="video.html">Video Editing</a>
`;
document.body.prepend(topnav);

const page = location.pathname.split('/').pop() || 'index.html';
topnav.querySelectorAll('a').forEach(a => {
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

// TYPEWRITER DIALOGUE + CLICKABLE SPRITE
const textEl = document.getElementById('dialogue-text');
if (textEl) {
  const lines = [
    "Welcome, traveler! ✦ Care to see what I've made?",
    "Need a designer? An editor? A writer? Good news: I come as a bundle.",
    "Where's everyone going? Bingo?",
    "To work.",
  ];
  const arrow = document.getElementById('next-arrow');
  const sprite = document.getElementById('sprite');
  let i = 0, timer, typing = false;

  const finish = () => {
    clearInterval(timer);
    textEl.textContent = lines[i];
    typing = false;
    arrow.classList.add('done');
  };

  const say = () => {
    clearInterval(timer);
    typing = true;
    arrow.classList.remove('done');
    textEl.textContent = '';
    let n = 0;
    timer = setInterval(() => {
      textEl.textContent = lines[i].slice(0, ++n);
      if (n >= lines[i].length) finish();
    }, 30);
  };

  sprite.addEventListener('click', () => {
    if (typing) { finish(); return; }
    i = (i + 1) % lines.length;
    say();
  });
  say();
}

// CLICK SOUNDS + MUTE BUTTON
let muted = false;
try { muted = localStorage.getItem('muted') === '1'; } catch (e) {}
let audio;
function blip(freq = 660, dur = 0.07) {
  if (muted) return;
  audio = audio || new (window.AudioContext || window.webkitAudioContext)();
  const o = audio.createOscillator();
  const g = audio.createGain();
  o.type = 'square';
  o.frequency.value = freq;
  g.gain.setValueAtTime(0.04, audio.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + dur);
  o.connect(g);
  g.connect(audio.destination);
  o.start();
  o.stop(audio.currentTime + dur);
}
document.addEventListener('pointerdown', e => {
  if (e.target.closest('#sprite')) blip(880);
  else if (e.target.closest('a, button, .card, .carousel img, .gallery img')) blip(660);
});

const muteBtn = document.createElement('button');
muteBtn.id = 'mute';
muteBtn.setAttribute('aria-label', 'Toggle sound');
muteBtn.textContent = muted ? '🔇' : '🔊';
muteBtn.addEventListener('click', () => {
  muted = !muted;
  muteBtn.textContent = muted ? '🔇' : '🔊';
  try { localStorage.setItem('muted', muted ? '1' : '0'); } catch (e) {}
});
document.body.appendChild(muteBtn);