const profileData = {
  name: "DVHorizon",
  role: "Developer",
  github: "https://github.com/DVHorizon",
  facebook: "https://www.facebook.com/haewonjongun/",
  tiktok: "https://www.tiktok.com/@im.river.one",
  emails: ["dvhorizon@gmail.com", "dangvanha123b@gmail.com"],
  education: "Sinh viên khoa Công nghệ thông tin FIT TDC, Trường Cao đẳng Công nghệ Thủ Đức.",
  skills: ["Laravel", "Docker", "C#", "Java", "Javascript", "PHP", "HTML/CSS"],
  avatar: "assets/dvhorizon-avatar-top.png",
  projects: [
    {
      title: "Real WebGL Water Portfolio",
      kicker: "Three.js Water",
      description: "A cinematic portfolio surface powered by the official Three.js Water shader, fog depth, and scroll-driven camera movement.",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=2560&q=85",
      fallback: "Remote ocean image unavailable. The cinematic project frame remains stable.",
      tags: ["Three.js", "Water.js", "GSAP"]
    },
    {
      title: "Containerized Laravel Workflow",
      kicker: "Backend Systems",
      description: "A practical engineering direction centered on Laravel, Docker, PHP, and reproducible local development workflows.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=2560&q=85",
      fallback: "Remote cyberpunk image unavailable. Skeleton fallback is active.",
      tags: ["Laravel", "Docker", "PHP"]
    },
    {
      title: "Cross-stack Developer Toolkit",
      kicker: "Applied Programming",
      description: "A stack profile spanning C#, Java, JavaScript, and UI implementation for durable tools and production-minded learning.",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=2560&q=85",
      fallback: "Remote abstract technology image unavailable. Layout remains stable.",
      tags: ["C#", "Java", "Javascript"]
    }
  ]
};

const playlist = [
  {
    title: "Endless Summer",
    artist: "Youzee Music",
    url: "assets/music/Youzee Music - Endless Summer - (320 Kbps).mp3"
  },
  {
    title: "Neverland",
    artist: "Youzee Music",
    url: "assets/music/Youzee Music - Neverland - (320 Kbps).mp3"
  },
  {
    title: "春禾",
    artist: "Youzee Music",
    url: "assets/music/Youzee Music - 春禾 - (320 Kbps).mp3"
  },
  {
    title: "Stream Bridge (溪桥)",
    artist: "Youzee Music",
    url: "assets/music/Youzee Music - Stream Bridge (溪桥) - (320 Kbps).mp3"
  },
  {
    title: "Zima Blue (齐马蓝)",
    artist: "Youzee Music",
    url: "assets/music/Youzee Music - Zima Blue (齐马蓝) - (320 Kbps).mp3"
  },
  {
    title: "分秒宇宙",
    artist: "Youzee Music",
    url: "assets/music/Youzee Music - 分秒宇宙 - (320 Kbps).mp3"
  },
  {
    title: "The Polar Express (极地特快)",
    artist: "Youzee Music",
    url: "assets/music/Youzee Music - The Polar Express (极地特快) - (320 Kbps).mp3"
  },
  {
    title: "Mộng",
    artist: "Kh Nguyen",
    url: "assets/music/Kh Nguyen - Mộng - (320 Kbps).mp3"
  },
  {
    title: "雨中舞",
    artist: "Soulloom苏洛牧",
    url: "assets/music/Soulloom苏洛牧 - 雨中舞 - (320 Kbps).mp3"
  }
];

const dom = {
  canvas: document.getElementById("water-canvas"),
  modeToggle: document.getElementById("mode-toggle"),
  heroSocials: document.getElementById("hero-socials"),
  contactLinks: document.getElementById("contact-links"),
  educationCopy: document.getElementById("education-copy"),
  skillGrid: document.getElementById("skill-grid"),
  projectGrid: document.getElementById("project-grid"),
  contactForm: document.getElementById("contact-form"),
  formStatus: document.getElementById("form-status"),
  audioWidget: document.getElementById("audio-widget"),
  audioFab: document.getElementById("audio-fab"),
  audioPanel: document.getElementById("audio-panel"),
  audioClose: document.getElementById("audio-close"),
  audioToggle: document.getElementById("audio-toggle"),
  prevTrack: document.getElementById("prev-track"),
  nextTrack: document.getElementById("next-track"),
  playlistToggle: document.getElementById("playlist-toggle"),
  playlistDrawer: document.getElementById("playlist-drawer"),
  playlistList: document.getElementById("playlist-list"),
  progressRange: document.getElementById("progress-range"),
  volumeRange: document.getElementById("volume-range"),
  volumeBtn: document.getElementById("volume-btn"),
  currentTime: document.getElementById("current-time"),
  durationTime: document.getElementById("duration-time"),
  trackTitle: document.getElementById("track-title"),
  trackArtist: document.getElementById("track-artist")
};

window.__DVHorizonWaterStatus = {
  engine: "booting",
  active: false,
  frames: 0,
  lastFrameAt: 0,
  error: null
};

renderProfile();
initImageFallbacks();
initSmoothAnchors();
initContactForm();
initTiltFrames();
initAudioPlayer();

let oceanApp = null;

bootOceanExperience();

function bootOceanExperience() {
  if (!dom.canvas) {
    document.body.classList.add("no-webgl");
    window.__DVHorizonWaterStatus.engine = "missing-canvas";
    return;
  }

  if (window.THREE) {
    try {
      oceanApp = createOceanScene(dom.canvas);
      oceanApp.init();
    } catch (error) {
      console.warn("Three.js ocean failed. Falling back to native WebGL.", error);
      window.__DVHorizonWaterStatus.error = error.message;
      oceanApp = null;
    }
  }

  if (!oceanApp) {
    try {
      oceanApp = createNativeOceanRenderer(dom.canvas);
      oceanApp.init();
    } catch (error) {
      console.warn("Native WebGL ocean failed.", error);
      document.body.classList.add("no-webgl");
      window.__DVHorizonWaterStatus.engine = "webgl-unavailable";
      window.__DVHorizonWaterStatus.error = error.message;
      return;
    }
  }

  if (window.gsap && window.ScrollTrigger) {
    initScrollScenes(oceanApp);
  }

  initModeToggle(oceanApp);
}

function renderProfile() {
  if (dom.educationCopy) {
    dom.educationCopy.textContent = profileData.education;
  }

  const socials = [
    { label: "GitHub", href: profileData.github },
    { label: "Facebook", href: profileData.facebook },
    { label: "TikTok", href: profileData.tiktok },
    { label: "Email", href: `mailto:${profileData.emails[0]}` }
  ];

  if (dom.heroSocials) {
    dom.heroSocials.innerHTML = socials
      .map((item) => renderLink("social-link", item))
      .join("");
  }

  if (dom.contactLinks) {
    const contactItems = [
      ...socials,
      { label: profileData.emails[1], href: `mailto:${profileData.emails[1]}` }
    ];
    dom.contactLinks.innerHTML = contactItems
      .map((item) => renderLink("contact-link", item))
      .join("");
  }

  if (dom.skillGrid) {
    dom.skillGrid.innerHTML = profileData.skills
      .map((skill) => `<span class="skill-chip">${escapeHtml(skill)}</span>`)
      .join("");
  }

  if (dom.projectGrid) {
    dom.projectGrid.innerHTML = profileData.projects
      .map((project) => {
        const tags = project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
        return `
          <article class="project-card tilt-frame" data-tilt data-depth="8">
            <figure class="image-shell project-media" data-fallback="${escapeHtml(project.fallback)}">
              <img src="${project.image}" alt="${escapeHtml(project.title)} project preview" width="2560" height="1440" loading="lazy" decoding="async">
            </figure>
            <div class="project-body">
              <div>
                <p class="project-kicker">${escapeHtml(project.kicker)}</p>
                <h3>${escapeHtml(project.title)}</h3>
                <p>${escapeHtml(project.description)}</p>
              </div>
              <div class="tag-row">${tags}</div>
            </div>
          </article>
        `;
      })
      .join("");
  }
}

function renderLink(className, item) {
  const target = item.href.startsWith("mailto:") ? "_self" : "_blank";
  return `<a class="${className}" href="${item.href}" target="${target}" rel="noreferrer">${escapeHtml(item.label)}</a>`;
}

function initImageFallbacks() {
  window.requestAnimationFrame(() => {
    document.querySelectorAll(".image-shell img").forEach((img) => {
      const shell = img.closest(".image-shell");
      if (!shell) return;

      const markLoaded = () => {
        shell.classList.add("is-loaded");
        shell.classList.remove("is-fallback");
      };

      const markFallback = () => {
        shell.classList.remove("is-loaded");
        shell.classList.add("is-fallback");
      };

      img.addEventListener("load", markLoaded, { once: true });
      img.addEventListener("error", markFallback, { once: true });

      if (img.complete && img.naturalWidth > 0) markLoaded();
      if (img.complete && img.naturalWidth === 0) markFallback();
    });
  });
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      const target = href ? document.querySelector(href) : null;
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initContactForm() {
  if (!dom.contactForm || !dom.formStatus) return;

  dom.contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(dom.contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      dom.formStatus.textContent = "Please complete every field before sending.";
      return;
    }

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    dom.formStatus.textContent = `Opening email to ${profileData.emails[0]}.`;
    window.location.href = `mailto:${profileData.emails[0]}?subject=${subject}&body=${body}`;
  });
}

function initTiltFrames() {
  const frames = Array.from(document.querySelectorAll("[data-tilt]"));
  if (!frames.length) return;

  const activeFrames = new WeakSet();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeFrames.add(entry.target);
        } else {
          activeFrames.delete(entry.target);
          entry.target.style.transform = "";
        }
      });
    },
    { threshold: 0.14 }
  );

  frames.forEach((frame) => {
    observer.observe(frame);
    frame.addEventListener("pointermove", (event) => {
      if (!activeFrames.has(frame)) return;
      const rect = frame.getBoundingClientRect();
      const depth = Number(frame.dataset.depth || 8);
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      frame.style.transform = `perspective(1100px) rotateX(${(-y * depth).toFixed(2)}deg) rotateY(${(x * depth).toFixed(2)}deg) translate3d(0, -4px, 0)`;
    });
    frame.addEventListener("pointerleave", () => {
      frame.style.transform = "";
    });
  });

  if (window.gsap && window.ScrollTrigger) {
    gsap.utils.toArray(".tilt-frame").forEach((frame, index) => {
      gsap.fromTo(
        frame,
        { y: 34 + index * 6 },
        {
          y: -16,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7
          }
        }
      );
    });
  }
}

function initAudioPlayer() {
  if (!dom.audioWidget || !dom.audioToggle || !dom.playlistList) return;

  const audio = new Audio();
  audio.preload = "metadata";
  audio.volume = Number(dom.volumeRange?.value || 0.72);
  let currentIndex = 0;
  let userInteracted = false;
  let seeking = false;

  renderPlaylist();
  loadTrack(0, false);

  // Auto-play on first user gesture anywhere on the page (browser policy requires interaction)
  function onFirstInteraction() {
    userInteracted = true;
    playCurrent();
    document.removeEventListener("click", onFirstInteraction, { capture: true });
    document.removeEventListener("keydown", onFirstInteraction, { capture: true });
    document.removeEventListener("touchstart", onFirstInteraction, { capture: true });
    document.removeEventListener("scroll", onFirstInteraction, { capture: true });
  }
  document.addEventListener("click", onFirstInteraction, { capture: true, once: true });
  document.addEventListener("keydown", onFirstInteraction, { capture: true, once: true });
  document.addEventListener("touchstart", onFirstInteraction, { capture: true, once: true });
  document.addEventListener("scroll", onFirstInteraction, { capture: true, once: true });

  dom.audioFab?.addEventListener("click", () => {
    openAudioPanel();
  });

  // Close panel when clicking anywhere outside the audio widget
  document.addEventListener("click", (e) => {
    if (
      dom.audioWidget.classList.contains("is-open") &&
      !dom.audioWidget.contains(e.target)
    ) {
      dom.audioWidget.classList.remove("is-open", "is-list-open");
      dom.audioFab?.setAttribute("aria-expanded", "false");
      dom.playlistToggle?.setAttribute("aria-expanded", "false");
    }
  });

  dom.audioToggle.addEventListener("click", async () => {
    userInteracted = true;
    openAudioPanel();
    if (audio.paused) {
      await playCurrent();
    } else {
      pauseCurrent();
    }
  });

  dom.prevTrack?.addEventListener("click", () => {
    userInteracted = true;
    loadTrack((currentIndex - 1 + playlist.length) % playlist.length, !audio.paused);
  });

  dom.nextTrack?.addEventListener("click", () => {
    userInteracted = true;
    loadTrack((currentIndex + 1) % playlist.length, !audio.paused);
  });

  dom.playlistToggle?.addEventListener("click", () => {
    const opened = dom.audioWidget.classList.toggle("is-list-open");
    dom.playlistToggle.setAttribute("aria-expanded", String(opened));
    openAudioPanel();
  });

  dom.progressRange?.addEventListener("input", () => {
    seeking = true;
  });

  dom.progressRange?.addEventListener("change", () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime = (Number(dom.progressRange.value) / 100) * audio.duration;
    }
    seeking = false;
  });

  let lastVolume = audio.volume > 0 ? audio.volume : 0.72;
  dom.volumeBtn?.addEventListener("click", () => {
    if (audio.volume > 0) {
      lastVolume = audio.volume;
      audio.volume = 0;
      if (dom.volumeRange) dom.volumeRange.value = "0";
      dom.volumeBtn.classList.add("is-muted");
    } else {
      audio.volume = lastVolume > 0 ? lastVolume : 0.72;
      if (dom.volumeRange) dom.volumeRange.value = String(audio.volume);
      dom.volumeBtn.classList.remove("is-muted");
    }
  });

  dom.volumeRange?.addEventListener("input", () => {
    audio.volume = Number(dom.volumeRange.value);
    if (audio.volume > 0) {
      dom.volumeBtn?.classList.remove("is-muted");
    } else {
      dom.volumeBtn?.classList.add("is-muted");
    }
  });

  audio.addEventListener("loadedmetadata", updateTimeUI);
  audio.addEventListener("timeupdate", updateTimeUI);
  audio.addEventListener("ended", () => {
    loadTrack((currentIndex + 1) % playlist.length, true);
  });
  audio.addEventListener("error", () => {
    dom.trackArtist.textContent = "Track unavailable. Select another song.";
    dom.audioWidget.classList.remove("is-playing");
    dom.audioToggle.setAttribute("aria-pressed", "false");
  });

  function openAudioPanel() {
    dom.audioWidget.classList.add("is-open");
    dom.audioFab?.setAttribute("aria-expanded", "true");
  }

  function renderPlaylist() {
    dom.playlistList.innerHTML = playlist
      .map((track, index) => `
        <button class="playlist-item" type="button" data-track="${index}">
          <div class="playlist-item-info">
            <strong>${escapeHtml(track.title)}</strong>
            <span>${escapeHtml(track.artist)}</span>
          </div>
          <span class="playlist-wave" aria-hidden="true">
            <i></i><i></i><i></i><i></i>
          </span>
        </button>
      `)
      .join("");

    dom.playlistList.querySelectorAll("[data-track]").forEach((button) => {
      button.addEventListener("click", () => {
        userInteracted = true;
        loadTrack(Number(button.dataset.track), true);
      });
    });
  }

  function loadTrack(index, autoplay) {
    currentIndex = index;
    const track = playlist[currentIndex];
    audio.pause();
    audio.src = track.url;
    audio.currentTime = 0;
    dom.trackTitle.textContent = track.title;
    dom.trackArtist.textContent = track.artist;
    dom.audioWidget.classList.remove("is-playing");
    dom.audioToggle.setAttribute("aria-pressed", "false");
    updateActivePlaylist();
    updateTimeUI();

    if (autoplay && userInteracted) {
      playCurrent();
    }
  }

  async function playCurrent() {
    try {
      await audio.play();
      dom.audioWidget.classList.add("is-playing");
      dom.audioToggle.setAttribute("aria-pressed", "true");
      dom.audioToggle.setAttribute("aria-label", "Pause selected track");
      dom.trackArtist.textContent = `${playlist[currentIndex].artist} - Playing`;
    } catch (error) {
      dom.trackArtist.textContent = "Browser blocked audio. Click play again.";
      dom.audioWidget.classList.remove("is-playing");
      dom.audioToggle.setAttribute("aria-pressed", "false");
    }
  }

  function pauseCurrent() {
    audio.pause();
    dom.audioWidget.classList.remove("is-playing");
    dom.audioToggle.setAttribute("aria-pressed", "false");
    dom.audioToggle.setAttribute("aria-label", "Play selected track");
    dom.trackArtist.textContent = `${playlist[currentIndex].artist} - Paused`;
  }

  function updateTimeUI() {
    const current = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;
    const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
    dom.currentTime.textContent = formatTime(current);
    dom.durationTime.textContent = formatTime(duration);

    if (!seeking && dom.progressRange) {
      dom.progressRange.value = duration > 0 ? String((current / duration) * 100) : "0";
    }
  }

  function updateActivePlaylist() {
    dom.playlistList.querySelectorAll(".playlist-item").forEach((item) => {
      item.classList.toggle("is-active", Number(item.dataset.track) === currentIndex);
    });
  }
}

function createOceanScene(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 1, 22000);
  const sun = new THREE.Vector3();
  const clock = new THREE.Clock();
  let water = null;
  let fallbackWater = null;
  let frame = 0;
  let enabled = true;
  let moon = null;

  const state = {
    cameraX: 0,
    cameraY: -35,
    cameraZ: 470,
    lookX: 0,
    lookY: -66,
    lookZ: -980,
    sunX: 0.0,
    sunY: 0.12,
    sunZ: -0.99,
    distortionScale: 9.6,
    waterSize: 1.5
  };

  function init() {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setClearColor(0x05050c, 1);
    scene.fog = new THREE.FogExp2(0x05050c, 0.002);
    document.body.classList.add("webgl-ready");

    camera.position.set(state.cameraX, state.cameraY, state.cameraZ);
    camera.lookAt(state.lookX, state.lookY, state.lookZ);

    addReflectionEnvironment();
    sun.set(state.sunX, state.sunY, state.sunZ).normalize();

    if (THREE.Water) {
      const waterGeometry = new THREE.PlaneBufferGeometry(20000, 20000);
      const waterNormals = new THREE.TextureLoader().load(
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg",
        (texture) => {
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
        }
      );

      water = new THREE.Water(waterGeometry, {
        textureWidth: 1024,
        textureHeight: 1024,
        waterNormals,
        sunDirection: sun.clone(),
        sunColor: 0xffffff,
        waterColor: 0x00546a,
        distortionScale: state.distortionScale,
        fog: scene.fog !== undefined
      });
      water.rotation.x = -Math.PI / 2;
      water.position.y = -72;
      water.material.uniforms.size.value = state.waterSize;
      scene.add(water);
      window.__DVHorizonWaterStatus.engine = "three-water";

      // BẮT BUỘC: truyền vector ánh trăng vào shader mặt nước
      if (moon) {
        const moonLightDirection = new THREE.Vector3().subVectors(moon.position, new THREE.Vector3(0, 0, 0)).normalize();
        water.material.uniforms['sunDirection'].value.copy(moonLightDirection);
      }
    } else {
      fallbackWater = createFallbackOcean();
      scene.add(fallbackWater);
      window.__DVHorizonWaterStatus.engine = "three-shader-fallback";
    }

    const skyGlow = new THREE.HemisphereLight(0x89eaff, 0x05050c, 0.58);
    const moonKey = new THREE.DirectionalLight(0xffffff, 2.25);
    const cyanRim = new THREE.PointLight(0x66f8ff, 3.4, 5200);
    const violetRim = new THREE.PointLight(0xb388ff, 2.2, 4600);
    moonKey.position.set(0, 450, -1800);
    cyanRim.position.set(-1200, 460, -1200);
    violetRim.position.set(1300, 620, -1600);
    scene.add(skyGlow, moonKey, cyanRim, violetRim);

    window.addEventListener("resize", resize, { passive: true });
    resize();
    window.__DVHorizonWaterStatus.active = true;
    animate();
  }

  function addReflectionEnvironment() {
    const skyGeometry = new THREE.SphereBufferGeometry(9000, 32, 16);
    const skyMaterial = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        topColor: { value: new THREE.Color(0x111a3d) },
        bottomColor: { value: new THREE.Color(0x02050d) },
        offset: { value: 0.46 },
        exponent: { value: 0.82 }
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + offset).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
        }
      `
    });
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(sky);

    const horizonGeometry = new THREE.PlaneBufferGeometry(7600, 980);
    const horizonMaterial = new THREE.MeshBasicMaterial({
      color: 0x4ff7ff,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const horizon = new THREE.Mesh(horizonGeometry, horizonMaterial);
    horizon.position.set(0, 76, -2550);
    scene.add(horizon);

    const stripMaterial = new THREE.MeshBasicMaterial({
      color: 0xb388ff,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    for (let i = 0; i < 7; i += 1) {
      const strip = new THREE.Mesh(new THREE.PlaneBufferGeometry(1400 - i * 90, 3), stripMaterial.clone());
      strip.material.opacity = 0.2 - i * 0.018;
      strip.position.set((i - 3) * 260, -34 + i * 1.8, -580 - i * 170);
      strip.rotation.x = -Math.PI / 2;
      scene.add(strip);
    }

    const markerGeometry = new THREE.TorusBufferGeometry(900, 2.4, 8, 128);
    const markerMaterial = new THREE.MeshBasicMaterial({
      color: 0xb388ff,
      transparent: true,
      opacity: 0.24,
      blending: THREE.AdditiveBlending
    });
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    marker.rotation.x = Math.PI / 2;
    marker.position.set(0, -30, -1050);
    scene.add(marker);

    // Create the moon in the sky
    const moonTexture = new THREE.TextureLoader().load("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg");
    const moonGeometry = new THREE.SphereGeometry(110, 64, 64);
    const moonMaterial = new THREE.MeshStandardMaterial({
      map: moonTexture,
      bumpMap: moonTexture,
      bumpScale: 0.05,
      emissiveMap: moonTexture,
      emissive: 0xffffff,
      emissiveIntensity: 0.85,
      roughness: 1.0,
      metalness: 0.0,
      fog: false
    });
    moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(0, 220, -1800);
    scene.add(moon);

    // Create a soft blurred radial glow behind the moon (Plane geometry facing camera)
    const moonGlowGeometry = new THREE.PlaneGeometry(500, 500);
    const moonGlowMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          float dist = distance(vUv, vec2(0.5));
          // Fade out smoothly and softly from the center (0.0) to the edges (0.5)
          float glow = pow(1.0 - smoothstep(0.0, 0.5, dist), 2.2);
          vec3 glowColor = vec3(1.0, 1.0, 0.95); // Bright warm white light
          gl_FragColor = vec4(glowColor, glow * 0.85);
        }
      `
    });
    const moonGlow = new THREE.Mesh(moonGlowGeometry, moonGlowMaterial);
    // Position it slightly behind the moon (z = -1802) to prevent depth fighting
    moonGlow.position.set(moon.position.x, moon.position.y, moon.position.z - 2);
    scene.add(moonGlow);

    // Add PointLight at the center of the moon to illuminate scene fog
    const moonPointLight = new THREE.PointLight(0xdcf0ff, 4.0, 1200);
    moonPointLight.position.copy(moon.position);
    scene.add(moonPointLight);

    // Add DirectionalLight pointing from the moon towards the camera
    const moonDirectionalLight = new THREE.DirectionalLight(0xdcf0ff, 1.5);
    moonDirectionalLight.position.copy(moon.position);
    moonDirectionalLight.target.position.set(0, -66, 470);
    scene.add(moonDirectionalLight);
    scene.add(moonDirectionalLight.target);
  }

  function createFallbackOcean() {
    const geometry = new THREE.PlaneBufferGeometry(7000, 7000, 180, 180);
    const material = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        colorA: { value: new THREE.Color(0x001e2a) },
        colorB: { value: new THREE.Color(0x4ff7ff) },
        colorC: { value: new THREE.Color(0xb388ff) }
      },
      vertexShader: `
        uniform float time;
        varying float vWave;
        varying vec3 vPosition;
        void main() {
           vec3 p = position;
          float w1 = sin(p.x * 0.0035 + time * 1.9);
          float w2 = cos(p.y * 0.0045 - time * 1.7);
          float w3 = sin((p.x + p.y) * 0.0025 + time * 2.7);
          float wave = w1 * 44.0 + w2 * 36.0 + w3 * 30.0;
          p.z += wave;
          vWave = wave;
          vPosition = p;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 colorA;
        uniform vec3 colorB;
        uniform vec3 colorC;
        uniform float time;
        varying float vWave;
        varying vec3 vPosition;
        void main() {
          float shine = smoothstep(12.0, 55.0, abs(vWave));
          float bands = sin((vPosition.x + vPosition.y) * 0.016 + time * 2.0) * 0.5 + 0.5;
          vec3 color = mix(colorA, colorB, shine * 0.72);
          color = mix(color, colorC, bands * 0.16);
          gl_FragColor = vec4(color, 0.86);
        }
      `
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -72;
    return mesh;
  }

  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  }

  function animate() {
    if (!enabled) return;
    frame = window.requestAnimationFrame(animate);
    window.__DVHorizonWaterStatus.frames += 1;
    window.__DVHorizonWaterStatus.lastFrameAt = performance.now();
    updateCamera();
    if (water) {
      water.material.uniforms["time"].value += 1.6 / 60.0;
      water.material.uniforms.distortionScale.value = state.distortionScale;
      water.material.uniforms.size.value = state.waterSize;
      sun.set(state.sunX, state.sunY, state.sunZ).normalize();
      water.material.uniforms.sunDirection.value.copy(sun);
    }
    if (fallbackWater) {
      fallbackWater.material.uniforms.time.value = clock.getElapsedTime();
      fallbackWater.material.uniforms.colorC.value.lerp(new THREE.Color(state.sunY > 0.9 ? 0x70f6ff : 0xb388ff), 0.04);
    }
    if (moon) {
      moon.rotation.y += 0.0015;
    }
    renderer.render(scene, camera);
    clock.getElapsedTime();
  }

  function updateCamera() {
    camera.position.x += (state.cameraX - camera.position.x) * 0.018;
    camera.position.y += (state.cameraY - camera.position.y) * 0.018;
    camera.position.z += (state.cameraZ - camera.position.z) * 0.018;
    camera.lookAt(state.lookX, state.lookY, state.lookZ);
  }

  function setScene(target) {
    gsap.to(state, {
      duration: 1.35,
      ease: "power3.out",
      overwrite: "auto",
      ...target
    });
  }

  function pause() {
    enabled = false;
    window.__DVHorizonWaterStatus.active = false;
    window.cancelAnimationFrame(frame);
  }

  function resume() {
    if (enabled) return;
    enabled = true;
    window.__DVHorizonWaterStatus.active = true;
    animate();
  }

  return { init, setScene, pause, resume };
}

function createNativeOceanRenderer(canvas) {
  const gl = canvas.getContext("webgl", {
    antialias: true,
    alpha: false,
    powerPreference: "high-performance"
  });

  if (!gl) {
    throw new Error("WebGL context is unavailable.");
  }

  const vertexShader = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentShader = `
    precision highp float;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float u_intensity;
    uniform float u_palette;

    float wave(vec2 p, float speed, float scale, float weight) {
      return sin(p.x * scale + u_time * speed) * weight
        + cos((p.x + p.y) * scale * 0.62 - u_time * speed * 0.8) * weight * 0.72
        + sin((p.x - p.y) * scale * 0.38 + u_time * speed * 1.24) * weight * 0.48;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      vec2 p = (uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);
      float depth = pow(1.0 - uv.y, 1.85);
      float perspective = 1.0 / max(0.18, depth + 0.08);
      vec2 q = vec2(p.x * perspective, depth * 8.0);

      float w = wave(q, 1.4, 3.0, 0.60);
      w += wave(q + vec2(2.4, -1.1), 2.0, 5.5, 0.26);
      w += wave(q + vec2(-0.8, 1.7), 2.6, 9.0, 0.12);
      float ridge = smoothstep(0.62, 1.16, abs(w) * u_intensity);
      float horizon = smoothstep(0.56, 0.86, uv.y);
      float mist = smoothstep(0.42, 0.76, uv.y);

      vec3 deep = vec3(0.008, 0.018, 0.035);
      vec3 teal = vec3(0.045, 0.48, 0.58);
      vec3 violet = vec3(0.46, 0.25, 0.86);
      vec3 sky = mix(vec3(0.01, 0.015, 0.04), vec3(0.07, 0.11, 0.25), uv.y);
      vec3 accent = mix(teal, violet, u_palette);
      vec3 water = mix(deep, accent, ridge * 0.74 + depth * 0.1);

      float spec = pow(max(0.0, sin((q.x + w) * 7.0 + u_time * 1.7)), 18.0) * 0.55;
      spec += pow(max(0.0, cos((q.x - q.y) * 11.0 - u_time * 2.1)), 24.0) * 0.26;
      water += accent * spec * (1.0 - horizon);
      water = mix(water, sky, horizon);
      water = mix(water, vec3(0.03, 0.08, 0.12), mist * 0.18);

      gl_FragColor = vec4(water, 1.0);
    }
  `;

  const program = createProgram(gl, vertexShader, fragmentShader);
  const positionLocation = gl.getAttribLocation(program, "a_position");
  const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  const timeLocation = gl.getUniformLocation(program, "u_time");
  const intensityLocation = gl.getUniformLocation(program, "u_intensity");
  const paletteLocation = gl.getUniformLocation(program, "u_palette");
  const buffer = gl.createBuffer();
  let frame = 0;
  let enabled = true;
  let intensity = 1.18;
  let targetIntensity = 1.18;
  let palette = 0.22;
  let targetPalette = 0.22;

  function init() {
    document.body.classList.add("webgl-ready");
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    window.addEventListener("resize", resize, { passive: true });
    resize();
    window.__DVHorizonWaterStatus.engine = "native-webgl-fallback";
    window.__DVHorizonWaterStatus.active = true;
    animate();
  }

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
    canvas.width = Math.max(1, Math.floor(window.innerWidth * ratio));
    canvas.height = Math.max(1, Math.floor(window.innerHeight * ratio));
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function animate(now = 0) {
    if (!enabled) return;
    frame = window.requestAnimationFrame(animate);
    intensity += (targetIntensity - intensity) * 0.035;
    palette += (targetPalette - palette) * 0.035;

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform1f(timeLocation, now * 0.001);
    gl.uniform1f(intensityLocation, intensity);
    gl.uniform1f(paletteLocation, palette);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    window.__DVHorizonWaterStatus.frames += 1;
    window.__DVHorizonWaterStatus.lastFrameAt = performance.now();
  }

  function setScene(target) {
    const scale = target && Number.isFinite(target.distortionScale) ? target.distortionScale : 4.6;
    targetIntensity = Math.max(0.42, Math.min(1.8, scale / 3.8));
    targetPalette = target && target.sunX > 0 ? 0.82 : target && target.sunY > 0.92 ? 0.12 : 0.28;
  }

  function pause() {
    enabled = false;
    window.__DVHorizonWaterStatus.active = false;
    window.cancelAnimationFrame(frame);
  }

  function resume() {
    if (enabled) return;
    enabled = true;
    window.__DVHorizonWaterStatus.active = true;
    animate();
  }

  return { init, setScene, pause, resume };
}

function createProgram(gl, vertexSource, fragmentSource) {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) || "Unable to link WebGL program.";
    gl.deleteProgram(program);
    throw new Error(message);
  }

  return program;
}

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || "Unable to compile WebGL shader.";
    gl.deleteShader(shader);
    throw new Error(message);
  }

  return shader;
}

function initScrollScenes(app) {
  gsap.registerPlugin(ScrollTrigger);

  const scenes = {
    hero: {
      cameraX: 0,
      cameraY: -35,
      cameraZ: 470,
      lookX: 0,
      lookY: -66,
      lookZ: -980,
      sunX: 0.0,
      sunY: 0.12,
      sunZ: -0.99,
      distortionScale: 9.6,
      waterSize: 1.5
    },
    about: {
      cameraX: -96,
      cameraY: -45,
      cameraZ: 390,
      lookX: 80,
      lookY: -68,
      lookZ: -1120,
      sunX: 0.0,
      sunY: 0.12,
      sunZ: -0.99,
      distortionScale: 10.0,
      waterSize: 1.6
    },
    projects: {
      cameraX: 140,
      cameraY: -40,
      cameraZ: 420,
      lookX: -80,
      lookY: -68,
      lookZ: -1040,
      sunX: 0.0,
      sunY: 0.12,
      sunZ: -0.99,
      distortionScale: 11.5,
      waterSize: 1.7
    },
    contact: {
      cameraX: 0,
      cameraY: 350,
      cameraZ: 0.1,
      lookX: 0,
      lookY: -66,
      lookZ: 0,
      sunX: 0.0,
      sunY: 0.12,
      sunZ: -0.99,
      distortionScale: 3.5,
      waterSize: 0.6
    }
  };

  Object.entries(scenes).forEach(([name, target]) => {
    const trigger = document.querySelector(`[data-scene="${name}"]`);
    if (!trigger) return;
    ScrollTrigger.create({
      trigger,
      start: "top 62%",
      end: "bottom 42%",
      onEnter: () => app.setScene(target),
      onEnterBack: () => app.setScene(target)
    });
  });

  gsap.utils.toArray(".section-inner").forEach((section) => {
    gsap.fromTo(
      section,
      { y: 36, autoAlpha: 0.66 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.86,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 84%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  gsap.utils.toArray(".project-card").forEach((card, index) => {
    gsap.fromTo(
      card,
      { y: 76, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        delay: index * 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 86%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  app.setScene(scenes.hero);
}

function initModeToggle(app) {
  if (!dom.modeToggle) return;

  dom.modeToggle.addEventListener("click", () => {
    const is2D = document.body.classList.toggle("mode-2d");
    dom.modeToggle.setAttribute("aria-pressed", String(is2D));
    dom.modeToggle.textContent = is2D ? "3D Mode" : "2D Mode";

    if (is2D) {
      app.pause();
    } else {
      app.resume();
    }
  });
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);
  return `${minutes}:${String(remaining).padStart(2, "0")}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
