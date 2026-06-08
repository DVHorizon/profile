const profileData = {
  name: "Dang Van Ha",
  role: "IT Student & Developer",
  github: "https://github.com/DVHorizon",
  facebook: "https://www.facebook.com/haewonjongun/",
  tiktok: "https://www.tiktok.com/@im.river.one",
  emails: ["dvhorizon@gmail.com", "dangvanha123b@gmail.com"],
  education: "IT Student at FIT TDC — Thu Duc College of Technology.",
  skills: ["Laravel", "Docker", "JavaScript", "React", "PHP", "HTML/CSS", "C#", "Java"],
  avatar: "assets/dvhorizon-avatar.png",
  projects: [
    {
      title: "AI CareerPath",
      kicker: "AI Web App",
      description: "An AI-powered platform that helps IT students find personalized learning paths, skill analysis, roadmap recommendations, and weekly schedules.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=2560&q=85",
      fallback: "Remote AI network visualization unavailable. The project layout remains stable.",
      tags: ["React", "Vite", "Three.js"]
    },
    {
      title: "SellPhones E-commerce",
      kicker: "Full-stack Platform",
      description: "A full-stack e-commerce platform for smartphones, built with Laravel and Docker for a smooth, reliable shopping experience.",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=2560&q=85",
      fallback: "Remote smartphone display image unavailable. Skeleton fallback is active.",
      tags: ["Laravel", "PHP", "Docker"]
    },
    {
      title: "DVHorizon Portfolio",
      kicker: "Personal Branding",
      description: "Personal portfolio featuring a cinematic WebGL ocean, GSAP scroll animations, glassmorphism audio player, and 2D fallback mode.",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=2560&q=85",
      fallback: "Remote ocean wave image unavailable. Layout remains stable.",
      tags: ["JavaScript", "WebGL", "GSAP"]
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
          <article class="project-card tilt-frame" data-depth="8">
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
  let stars = null;
  let starsMaterial = null;
  let waterFogMaterials = [];

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
    distortionScale: 75.0,
    waterSize: 0.9
  };

  function init() {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setClearColor(0x05050c, 1);
    scene.fog = new THREE.FogExp2(0x05050c, 0.00016);
    document.body.classList.add("webgl-ready");

    camera.position.set(state.cameraX, state.cameraY, state.cameraZ);
    camera.lookAt(state.lookX, state.lookY, state.lookZ);

    addReflectionEnvironment();
    createGalaxyStars();
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
    moonKey.position.set(0, 900, -8000);
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
    // Soft vertical & horizontal fade-out for horizon plane to blend it seamlessly with water & sky
    const horizonMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
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
          // Soft vertical fade-out near the water line (vUv.y around 0.35)
          float verticalFade = 0.0;
          if (vUv.y > 0.35) {
            float h = (vUv.y - 0.35) / 0.65;
            // Soft fade-in starting exactly at the water line, then smooth exponential decay going up
            verticalFade = smoothstep(0.0, 0.12, h) * exp(-h * 2.8);
            // Smoothly fade to 0.0 at the top edge of the horizon plane to prevent hard line borders
            verticalFade *= smoothstep(1.0, 0.82, vUv.y);
          }
          // Horizontal fade-out at left and right edges
          float horizontalFade = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
          
          vec3 horizonColor = vec3(0.31, 0.97, 1.0);
          gl_FragColor = vec4(horizonColor, verticalFade * horizontalFade * 0.30);
        }
      `
    });
    const horizon = new THREE.Mesh(horizonGeometry, horizonMaterial);
    horizon.position.set(0, 76, -2550);
    horizon.renderOrder = 3;
    scene.add(horizon);



    // Create multiple stacked layers of fog to give it volume and real height
    const fogHeights = [1000, 1020, 1040, 1060];
    const fogOpacities = [0.22, 0.16, 0.12, 0.06];
    const fogSizes = [
      { w: 9000, h: 5000 },
      { w: 8600, h: 4800 },
      { w: 8200, h: 4600 },
      { w: 7800, h: 4400 }
    ];

    for (let i = 0; i < 4; i++) {
      const fogPlaneGeometry = new THREE.PlaneGeometry(fogSizes[i].w, fogSizes[i].h);
      const mat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(0x7a8eff) } // Soft bluish-indigo fog
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vWorldPosition;
          void main() {
            vUv = uv;
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 color;
          varying vec2 vUv;
          varying vec3 vWorldPosition;
          
          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
          }
          
          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                       mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
          }
          
          void main() {
            // Horizontal fade to hide left and right borders of the plane
            float horizontalFade = smoothstep(4200.0, 2600.0, abs(vWorldPosition.x));
            
            // Vertical fade: thickest at water line (y = -72.0), decays exponentially as we go up, and fades out going down
            float verticalFade = 0.0;
            if (vWorldPosition.y >= -72.0) {
              float h = (vWorldPosition.y - (-72.0)) / 1200.0;
              verticalFade = exp(-h * 1.2);
              // Smoothly fade to 0.0 before reaching the top edge of the plane (no seams)
              verticalFade *= smoothstep(3200.0, 1800.0, vWorldPosition.y);
            } else {
              float h = (-72.0 - vWorldPosition.y) / 100.0;
              verticalFade = smoothstep(1.0, 0.0, h);
            }
            
            // Slowly moving atmospheric mist noise using world XY coordinates for vertical orientation
            vec2 noiseUv = vWorldPosition.xy * 0.0012 - vec2(time * 0.018 + float(${i}) * 0.4, time * 0.006);
            float n = noise(noiseUv) * 0.58 + noise(noiseUv * 2.4) * 0.42;
            
            float finalGlow = verticalFade * horizontalFade * (0.35 + n * 0.65);
            
            gl_FragColor = vec4(color, finalGlow * float(${fogOpacities[i]}));
          }
        `
      });
      const waterFog = new THREE.Mesh(fogPlaneGeometry, mat);
      // No rotation around X axis - stand vertically to cover the sky
      waterFog.position.set(0, fogHeights[i], -1500 - i * 150);
      waterFog.renderOrder = 4;
      scene.add(waterFog);
      waterFogMaterials.push(mat);
    }

    // Create the moon in the sky
    const moonTexture = new THREE.TextureLoader().load("assets/moon.jpg");
    moonTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const moonGeometry = new THREE.SphereGeometry(700, 64, 64);
    const moonMaterial = new THREE.ShaderMaterial({
      uniforms: {
        ...THREE.UniformsLib.fog,
        u_moonTexture: { value: moonTexture },
        lightDir: { value: new THREE.Vector3(0.75, 0.2, 0.6).normalize() },
        shadowIntensity: { value: 0.0 }, // Cleft part completely black
        brightness: { value: 2.2 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorldNormal;
        #include <fog_pars_vertex>
        void main() {
          vUv = uv;
          vWorldNormal = normalize(vec3(modelMatrix * vec4(normal, 0.0)));
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          #include <fog_vertex>
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D u_moonTexture;
        uniform vec3 lightDir;
        uniform float shadowIntensity;
        uniform float brightness;
        varying vec2 vUv;
        varying vec3 vWorldNormal;
        #include <fog_pars_fragment>
        void main() {
          vec4 texColor = texture2D(u_moonTexture, vUv);
          
          // Boost local contrast to enhance surface details and craters
          vec3 enhancedColor = texColor.rgb;
          enhancedColor = clamp((enhancedColor - 0.5) * 1.35 + 0.5, 0.0, 1.0);
          
          vec3 normal = normalize(vWorldNormal);
          float dotNL = dot(normal, lightDir);
          
          // Smooth terminator transition
          float lightFactor = smoothstep(-0.1, 0.15, dotNL);
          float diffuse = mix(shadowIntensity, 1.0, lightFactor);
          
          gl_FragColor = vec4(enhancedColor * diffuse * brightness, 1.0);
          #include <fog_fragment>
        }
      `,
      fog: false,
      transparent: true
    });

    moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(0, 850, -8000);
    moon.renderOrder = 2;
    scene.add(moon);

    // Create a soft blurred radial glow behind the moon (Plane geometry facing camera)
    const moonGlowGeometry = new THREE.PlaneGeometry(3000, 3000);
    const moonGlowMaterial = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.fog,
        {}
      ]),
      transparent: true,
      depthWrite: false,
      vertexShader: `
        varying vec2 vUv;
        #include <fog_pars_vertex>
        void main() {
          vUv = uv;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          #include <fog_vertex>
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        #include <fog_pars_fragment>
        void main() {
          vec2 center = vec2(0.5);
          float dist = distance(vUv, center);
          
          // Base radial glow
          float glow = pow(1.0 - smoothstep(0.0, 0.5, dist), 2.2);
          
          // Crescent mask for the glow (fades out on the bottom-left dark side)
          vec2 dir = vUv - center;
          vec2 lightDir2D = normalize(vec2(0.75, 0.2));
          float dotGlow = dot(normalize(dir + vec2(0.0001)), lightDir2D);
          float mask = smoothstep(-0.6, 0.4, dotGlow);
          mask = mix(0.01, 1.0, mask);
          
          vec3 glowColor = vec3(1.0, 1.0, 0.95); // Bright warm white light
          gl_FragColor = vec4(glowColor, glow * mask * 1.1);
          #include <fog_fragment>
        }
      `,
      fog: true
    });
    const moonGlow = new THREE.Mesh(moonGlowGeometry, moonGlowMaterial);
    // Position it slightly behind the moon (z = -8010) to prevent depth fighting
    moonGlow.position.set(moon.position.x, moon.position.y, moon.position.z - 10);
    moonGlow.renderOrder = 1;
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
          float w1 = sin(p.x * 0.0018 + time * 1.9);
          float w2 = cos(p.y * 0.0022 - time * 1.7);
          float w3 = sin((p.x + p.y) * 0.0012 + time * 2.7);
          float wave = w1 * 180.0 + w2 * 150.0 + w3 * 120.0;
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

        float hash(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
        }

        void main() {
          float shine = smoothstep(12.0, 55.0, abs(vWave));
          float bands = sin((vPosition.x + vPosition.y) * 0.016 + time * 2.0) * 0.5 + 0.5;
          vec3 color = mix(colorA, colorB, shine * 0.72);
          color = mix(color, colorC, bands * 0.16);

          // Procedural galaxy reflection
          vec2 pos = vPosition.xy;
          float galaxyPath = dot(pos, vec2(-0.45, 0.89));
          float distToCore = length(pos - vec2(-1500.0, 3000.0));

          // Concentration in the galaxy band & core - wider band, less concentrated core
          float bandIntensity = exp(-galaxyPath * galaxyPath * 0.0000001);
          float coreIntensity = exp(-distToCore * distToCore * 0.0000002) * 0.8;
          float galaxyGlow = (bandIntensity * 0.70 + coreIntensity * 0.30);

          // Apply waves distortion to reflection
          float waveDistort = sin(vPosition.x * 0.05 + time * 3.0) * 8.0;
          vec2 distortedGrid = (pos + vec2(waveDistort)) * 0.04;
          vec2 distortedId = floor(distortedGrid);
          vec2 distortedF = fract(distortedGrid);
          float distortedStar = 0.0;
          float h2 = hash(distortedId);
          if (h2 > 0.90) {
            vec2 offset = vec2(hash(distortedId + 0.12), hash(distortedId + 0.58)) * 0.8;
            float d = length(distortedF - offset);
            float twinkle = sin(time * (1.6 + h2 * 2.5) + h2 * 6.28) * 0.5 + 0.5;
            distortedStar = smoothstep(0.08, 0.0, d / (0.01 + 0.03 * h2 * twinkle));
          }

          // Choose base pastel color for fallback reflection
          vec3 starColor = vec3(0.92, 0.96, 1.0);
          if (distortedStar > 0.0) {
            float cSelect = hash(distortedId + 0.99);
            if (cSelect < 0.2) starColor = vec3(0.55, 0.90, 0.98);
            else if (cSelect < 0.4) starColor = vec3(0.78, 0.65, 0.98);
            else if (cSelect < 0.6) starColor = vec3(0.98, 0.86, 0.65);
            else if (cSelect < 0.8) starColor = vec3(0.98, 0.70, 0.80);
            else starColor = vec3(0.60, 0.92, 0.82);
            
            float cShift = sin(time * 2.0 + cSelect * 6.28) * 0.1;
            starColor = clamp(starColor + vec3(cShift, -cShift, 0.0), 0.4, 1.0);
          }

          color += starColor * distortedStar * galaxyGlow * 0.85;

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
      water.material.uniforms["time"].value += 0.55 / 60.0;
      water.material.uniforms.distortionScale.value = state.distortionScale;
      water.material.uniforms.size.value = state.waterSize;
      sun.set(state.sunX, state.sunY, state.sunZ).normalize();
      water.material.uniforms.sunDirection.value.copy(sun);
    }
    if (starsMaterial) {
      starsMaterial.uniforms["time"].value = clock.getElapsedTime();
    }
    if (waterFogMaterials.length > 0) {
      waterFogMaterials.forEach(mat => {
        mat.uniforms["time"].value = clock.getElapsedTime();
      });
    }
    if (fallbackWater) {
      fallbackWater.material.uniforms.time.value = clock.getElapsedTime() * 0.35;
      fallbackWater.material.uniforms.colorC.value.lerp(new THREE.Color(state.sunY > 0.9 ? 0x70f6ff : 0xb388ff), 0.04);
    }
    if (moon) {
      moon.rotation.y += 0.0002;
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

  function createGlowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(230, 245, 255, 0.85)');
    gradient.addColorStop(0.5, 'rgba(120, 200, 255, 0.35)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(canvas);
  }

  function createGalaxyStars() {
    const starsCount = 1500;
    const starsGeometry = new THREE.BufferGeometry();
    const starsPositions = new Float32Array(starsCount * 3);
    const starsSizes = new Float32Array(starsCount);
    const starsPhases = new Float32Array(starsCount);

    const u = new THREE.Vector3(-1500, 1000, -3000).normalize();
    const v = new THREE.Vector3(-u.z, 0, u.x).normalize();
    const w = new THREE.Vector3().crossVectors(u, v).normalize();

    const R = 8000;

    for (let i = 0; i < starsCount; i++) {
      let p = new THREE.Vector3();
      let isValid = false;
      while (!isValid) {
        if (i < 250) {
          // Core stars: softer, wider concentration around core direction 'u'
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.pow(Math.random(), 1.5) * 0.35; 
          p = u.clone()
            .addScaledVector(v, Math.cos(angle) * dist)
            .addScaledVector(w, Math.sin(angle) * dist)
            .normalize();
        } else {
          // Band stars: stretched along the diagonal band (U-V plane)
          // Generates all along the circle (from -PI to PI)
          const t = (Math.random() - 0.5) * Math.PI * 2.0; 
          const widthFactor = (Math.random() - 0.5) * (Math.random() - 0.5) * 0.46;
          p = new THREE.Vector3()
            .addScaledVector(u, Math.cos(t))
            .addScaledVector(v, Math.sin(t))
            .addScaledVector(w, widthFactor)
            .normalize();
        }
        
        // Ensure stars are in the upper sky (y is above the horizon level)
        if (p.y > -0.02) {
          isValid = true;
        }
      }

      const radius = R * (0.95 + Math.random() * 0.1);
      
      starsPositions[i * 3] = p.x * radius;
      starsPositions[i * 3 + 1] = p.y * radius;
      starsPositions[i * 3 + 2] = p.z * radius;

      if (i < 250) {
        starsSizes[i] = 14.0 + Math.random() * 22.0;
      } else {
        starsSizes[i] = 8.0 + Math.random() * 16.0;
      }
      
      starsPhases[i] = Math.random() * Math.PI * 2;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(starsSizes, 1));
    starsGeometry.setAttribute('phase', new THREE.BufferAttribute(starsPhases, 1));

    const starTexture = createGlowTexture();

    starsMaterial = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.fog,
        {
          time: { value: 0 },
          pointTexture: { value: starTexture }
        }
      ]),
      vertexShader: `
        uniform float time;
        attribute float size;
        attribute float phase;
        varying float vPhase;
        #include <fog_pars_vertex>
        void main() {
          vPhase = phase;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          #include <fog_vertex>
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = size * (2200.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform sampler2D pointTexture;
        varying float vPhase;
        #include <fog_pars_fragment>
        void main() {
          float twinkle = 0.40 + 0.60 * sin(time * (1.6 + sin(vPhase)) + vPhase);
          
          // Select base pastel colors using phase (avoids overly saturated colors)
          float colorSelect = fract(vPhase * 0.159);
          vec3 starColor;
          if (colorSelect < 0.2) {
            starColor = vec3(0.55, 0.90, 0.98); // soft cyan
          } else if (colorSelect < 0.4) {
            starColor = vec3(0.78, 0.65, 0.98); // soft lavender/violet
          } else if (colorSelect < 0.6) {
            starColor = vec3(0.98, 0.86, 0.65); // soft gold/cream
          } else if (colorSelect < 0.8) {
            starColor = vec3(0.98, 0.70, 0.80); // soft rose/pink
          } else {
            starColor = vec3(0.60, 0.92, 0.82); // soft mint/aquamarine
          }
          
          // Subtle atmospheric color shifting over time
          float cShift = sin(time * 2.0 + vPhase) * 0.1;
          starColor = clamp(starColor + vec3(cShift, -cShift, sin(time * 1.5 + vPhase * 2.0) * 0.08), 0.4, 1.0);

          vec4 texColor = texture2D(pointTexture, gl_PointCoord);
          gl_FragColor = texColor * vec4(starColor * 1.5, twinkle);
          #include <fog_fragment>
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false
    });

    stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
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

    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    vec3 getGalaxyStars(vec2 pos, float time) {
      float angle = 0.523;
      float cosA = cos(angle);
      float sinA = sin(angle);
      vec2 rotPos = vec2(pos.x * cosA - pos.y * sinA, pos.x * sinA + pos.y * cosA);

      vec2 rotCore = vec2(-0.2, 0.1);

      vec2 grid = rotPos * 45.0;
      vec2 id = floor(grid);
      vec2 f = fract(grid);
      float star = 0.0;
      float h = hash(id);
      if (h > 0.91) {
        vec2 offset = vec2(hash(id + 0.12), hash(id + 0.62)) * 0.8;
        float d = length(f - offset);
        float twinkle = sin(time * (1.6 + h * 2.2) + h * 6.28) * 0.5 + 0.5;
        star = smoothstep(0.1, 0.0, d / (0.01 + 0.035 * h * twinkle));
      }

      float distToMidline = abs(rotPos.y - rotCore.y);
      float distToCore = length(rotPos - rotCore);
      // Wider band and more dispersed core
      float bandGlow = exp(-distToMidline * distToMidline * 6.0);
      float coreGlow = exp(-distToCore * distToCore * 3.5) * 0.8;
      float intensity = bandGlow * 0.70 + coreGlow * 0.30;

      // Base pastel color selection using hash
      vec3 starColor = vec3(0.92, 0.96, 1.0);
      if (star > 0.0) {
        float cSelect = hash(id + 0.88);
        if (cSelect < 0.2) starColor = vec3(0.55, 0.90, 0.98); // soft cyan
        else if (cSelect < 0.4) starColor = vec3(0.78, 0.65, 0.98); // soft lavender
        else if (cSelect < 0.6) starColor = vec3(0.98, 0.86, 0.65); // soft gold
        else if (cSelect < 0.8) starColor = vec3(0.98, 0.70, 0.80); // soft rose
        else starColor = vec3(0.60, 0.92, 0.82); // soft mint
        
        float cShift = sin(time * 2.0 + cSelect * 6.28) * 0.1;
        starColor = clamp(starColor + vec3(cShift, -cShift, 0.0), 0.4, 1.0);
      }

      return starColor * star * intensity;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      vec2 p = (uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);
      float depth = pow(1.0 - uv.y, 1.85);
      float perspective = 1.0 / max(0.18, depth + 0.08);
      vec2 q = vec2(p.x * perspective, depth * 8.0);

      float w = wave(q, 1.4, 1.5, 1.80);
      w += wave(q + vec2(2.4, -1.1), 2.0, 2.8, 0.85);
      w += wave(q + vec2(-0.8, 1.7), 2.6, 4.5, 0.40);
      float ridge = smoothstep(0.62, 1.16, abs(w) * u_intensity);
      float horizon = smoothstep(0.56, 0.86, uv.y);
      float mist = smoothstep(0.42, 0.76, uv.y);

      vec3 deep = vec3(0.008, 0.018, 0.035);
      vec3 teal = vec3(0.045, 0.48, 0.58);
      vec3 violet = vec3(0.46, 0.25, 0.86);

      // Procedural sky stars
      vec2 skyPos = p * 1.5;
      vec3 skyStars = getGalaxyStars(skyPos + vec2(0.3, 0.0), u_time);
      vec3 sky = mix(vec3(0.01, 0.015, 0.04), vec3(0.07, 0.11, 0.25), uv.y);
      sky += skyStars * (1.0 - mist);

      vec3 accent = mix(teal, violet, u_palette);
      vec3 water = mix(deep, accent, ridge * 0.74 + depth * 0.1);

      // Procedural water stars reflection
      vec2 reflectedPos = vec2(q.x * 0.15 - w * 0.04, (8.0 - q.y) * 0.12 - w * 0.04) + vec2(0.3, 0.0);
      vec3 waterStars = getGalaxyStars(reflectedPos, u_time);
      float reflectionFade = smoothstep(0.0, 0.4, uv.y) * (1.0 - uv.y);
      water += waterStars * 0.72 * reflectionFade;

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
    gl.uniform1f(timeLocation, now * 0.00035);
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
      distortionScale: 75.0,
      waterSize: 0.9
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
      distortionScale: 78.0,
      waterSize: 0.95
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
      distortionScale: 85.0,
      waterSize: 1.0
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
      distortionScale: 28.0,
      waterSize: 0.4
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
