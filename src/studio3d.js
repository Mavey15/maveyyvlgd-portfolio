import * as THREE from 'three';

function createWoodTexture(baseHex, plankLines = true) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, 256, 256);

  let seed = 107;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 0xffffffff;
  };
  for (let i = 0; i < 65; i++) {
    ctx.strokeStyle = rand() > 0.5 ? 'rgba(255,255,255,0.08)' : 'rgba(28,22,16,0.08)';
    ctx.lineWidth = 0.7 + rand() * 1.4;
    const y = rand() * 256;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 256; x += 16) {
      ctx.lineTo(x, y + Math.sin(x * 0.03 + i) * 2);
    }
    ctx.stroke();
  }
  if (plankLines) {
    ctx.fillStyle = 'rgba(20, 18, 16, 0.13)';
    for (let i = 0; i < 6; i++) {
      ctx.fillRect(0, i * 42.6, 256, 1.2);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

const CAMERA_PRESETS = {
  overview: { look: new THREE.Vector3(1.5, 0.9, 0.25), yaw: Math.PI / 4, elev: 12.8, zoom: 0.96 },
  projects: { look: new THREE.Vector3(-1.4, 1.05, -1.2), yaw: Math.PI / 4 - 0.16, elev: 10.6, zoom: 1.45 },
  about: { look: new THREE.Vector3(2.2, 1.35, -3.0), yaw: Math.PI / 4 + 0.14, elev: 10.8, zoom: 1.42 },
  contact: { look: new THREE.Vector3(2.8, 0.85, 1.6), yaw: Math.PI / 4 - 0.22, elev: 10.8, zoom: 1.44 },
};

const ZONE_PINS = [
  { id: 'projects', pos: new THREE.Vector3(-2.4, 2.25, -1.5) },
  { id: 'about', pos: new THREE.Vector3(1.5, 2.7, -3.6) },
  { id: 'contact', pos: new THREE.Vector3(2.3, 1.85, 1.7) },
];

export function mountMaveyyStudio3D(container, options = {}) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (err) {
    if (options.onFallback) options.onFallback(err);
    return { update() {}, triggerCam() {}, destroy() {} };
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-8.5, 8.5, 5.2, -5.2, 0.1, 100);

  const hemi = new THREE.HemisphereLight('#ffffff', '#5a6b65', 1.15);
  const sun = new THREE.DirectionalLight('#fff8ed', 1.5);
  sun.position.set(10, 18, 12);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.near = 2;
  sun.shadow.camera.far = 42;
  sun.shadow.camera.left = -10;
  sun.shadow.camera.right = 10;
  sun.shadow.camera.top = 10;
  sun.shadow.camera.bottom = -10;
  sun.shadow.bias = -0.0008;
  const amb = new THREE.AmbientLight('#ffffff', 0.34);
  scene.add(hemi, sun, amb);

  const studio = new THREE.Group();
  scene.add(studio);

  const woodFloor = createWoodTexture('#e8e0d4', true);
  woodFloor.repeat.set(3, 2.5);
  const woodDesk = createWoodTexture('#d7c5ae', false);

  const floorMat = new THREE.MeshStandardMaterial({ map: woodFloor, roughness: 0.78, metalness: 0.04 });
  const plinthMat = new THREE.MeshStandardMaterial({ color: '#1a2226', roughness: 0.65, metalness: 0.18 });
  const wallMat = new THREE.MeshStandardMaterial({ color: '#f7f8f5', roughness: 0.86, metalness: 0.02 });
  const trimMat = new THREE.MeshStandardMaterial({ color: '#1b2226', roughness: 0.42, metalness: 0.35 });
  const glassMat = new THREE.MeshStandardMaterial({
    color: '#c7e6f5',
    emissive: '#38bdf8',
    emissiveIntensity: 0.08,
    roughness: 0.12,
    metalness: 0.12,
    transparent: true,
    opacity: 0.44,
  });
  const deskMat = new THREE.MeshStandardMaterial({ map: woodDesk, roughness: 0.66 });
  const tealMat = new THREE.MeshStandardMaterial({ color: '#0d5c51', roughness: 0.88 });
  const sofaMat = new THREE.MeshStandardMaterial({ color: '#2c3a40', roughness: 0.86 });
  const chairMat = new THREE.MeshStandardMaterial({ color: '#222b30', roughness: 0.78 });
  const leafMat = new THREE.MeshStandardMaterial({ color: '#2d7a58', roughness: 0.78 });
  const potMat = new THREE.MeshStandardMaterial({ color: '#dcd5ca', roughness: 0.82 });

  const clickableMeshes = [];

  const addBox = (w, h, d, mat, x, y, z, parent = studio, shadow = true, zone = null) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    m.castShadow = shadow;
    m.receiveShadow = shadow;
    if (zone) {
      m.userData.zone = zone;
      clickableMeshes.push(m);
    }
    parent.add(m);
    return m;
  };

  // 1. Studio Plinth & Deck (11.2m x 8.6m)
  addBox(11.8, 0.54, 9.2, plinthMat, 0, -0.34, 0, studio, false);
  const deck = addBox(11.2, 0.14, 8.6, floorMat, 0, -0.07, 0, studio, false);
  deck.receiveShadow = true;

  // 2. L-Corner Architectural Walls + Studio Mullion Windows
  addBox(11.2, 3.25, 0.22, wallMat, 0, 1.62, -4.19);
  addBox(0.22, 3.25, 8.6, wallMat, -5.49, 1.62, 0);
  addBox(11.4, 0.09, 0.28, trimMat, 0, 3.28, -4.19, studio, false);
  addBox(0.28, 0.09, 8.8, trimMat, -5.49, 3.28, 0, studio, false);

  for (const wz of [-1.8, 1.4]) {
    addBox(0.06, 2.0, 2.2, trimMat, -5.36, 1.8, wz, studio, false);
    addBox(0.08, 1.82, 2.0, glassMat, -5.35, 1.8, wz, studio, false);
    addBox(0.09, 1.82, 0.05, trimMat, -5.34, 1.8, wz, studio, false);
  }
  addBox(2.4, 2.0, 0.06, trimMat, -2.5, 1.8, -4.06, studio, false);
  addBox(2.2, 1.82, 0.08, glassMat, -2.5, 1.8, -4.05, studio, false);
  addBox(0.05, 1.82, 0.09, trimMat, -2.5, 1.8, -4.04, studio, false);

  // Wall sconces (cleanly mounted on walls)
  const ledMats = [];
  for (const wx of [-2.5, 1.5]) {
    addBox(1.8, 0.06, 0.1, trimMat, wx, 2.98, -4.03, studio, false);
    const lm = new THREE.MeshStandardMaterial({ color: '#fff8ec', emissive: '#ffdfad', emissiveIntensity: 0.25 });
    ledMats.push(lm);
    addBox(1.66, 0.03, 0.08, lm, wx, 2.94, -4.0, studio, false);
  }

  // 3. ZONE: PROJECTS (MaveyyVlgd Dual-Monitor Vibe Coding Workstation)
  const deskGroup = new THREE.Group();
  deskGroup.position.set(-2.4, 0, -1.6);
  studio.add(deskGroup);

  addBox(2.3, 0.08, 0.96, deskMat, 0, 0.76, 0, deskGroup, true, 'projects');
  addBox(0.07, 0.74, 0.82, trimMat, -1.06, 0.37, 0, deskGroup);
  addBox(0.07, 0.74, 0.82, trimMat, 1.06, 0.37, 0, deskGroup);
  // Wide desk mat & mechanical keyboard
  addBox(1.1, 0.012, 0.42, tealMat, 0, 0.805, 0.12, deskGroup, false, 'projects');
  addBox(0.56, 0.024, 0.18, new THREE.MeshStandardMaterial({ color: '#f3f5f4', roughness: 0.55 }), -0.08, 0.82, 0.14, deskGroup, false, 'projects');

  // Dual angled monitors (clickable -> Projects!)
  const screens = [];
  for (const [mx, rotY] of [[-0.44, 0.2], [0.44, -0.2]]) {
    const mg = new THREE.Group();
    mg.position.set(mx, 1.15, -0.22);
    mg.rotation.y = rotY;
    deskGroup.add(mg);
    addBox(0.8, 0.48, 0.045, trimMat, 0, 0, 0, mg, true, 'projects');
    const sm = new THREE.MeshStandardMaterial({ color: '#0f172a', emissive: '#3fd4be', emissiveIntensity: 0.65, roughness: 0.28 });
    screens.push(sm);
    addBox(0.74, 0.42, 0.014, sm, 0, 0, 0.025, mg, false, 'projects');
    addBox(0.06, 0.22, 0.06, trimMat, 0, -0.28, -0.02, mg, false);
  }

  // Desk lamp & coffee mug
  addBox(0.04, 0.38, 0.04, trimMat, -0.94, 0.97, -0.22, deskGroup, false);
  const lampBulbMat = new THREE.MeshStandardMaterial({ color: '#fff3c4', emissive: '#ffcf70', emissiveIntensity: 0.25 });
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 10), lampBulbMat);
  bulb.position.set(-0.94, 1.18, -0.2);
  deskGroup.add(bulb);
  const deskLight = new THREE.PointLight('#ffd28a', 0, 5.5, 1.6);
  deskLight.position.set(-3.2, 1.55, -1.7);
  studio.add(deskLight);

  const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.052, 0.12, 12), new THREE.MeshStandardMaterial({ color: '#0d5c51', roughness: 0.4 }));
  mug.position.set(0.88, 0.86, 0.16);
  deskGroup.add(mug);

  // Ergonomic Chair (seat at z = +0.8, backrest at +1.08)
  addBox(0.62, 0.08, 0.56, chairMat, 0, 0.48, 0.8, deskGroup, true, 'projects');
  addBox(0.56, 0.66, 0.08, chairMat, 0, 0.84, 1.08, deskGroup, true, 'projects');
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.44, 10), trimMat);
  stem.position.set(0, 0.22, 0.8);
  deskGroup.add(stem);
  const cbase = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.04, 14), trimMat);
  cbase.position.set(0, 0.02, 0.8);
  deskGroup.add(cbase);

  // MaveyyVlgd 3D Character seated properly facing -Z (monitors!)
  const avatar = new THREE.Group();
  avatar.position.set(0, 0, 0.78);
  deskGroup.add(avatar);

  const hoodieMat = new THREE.MeshStandardMaterial({ color: '#0d5c51', roughness: 0.72 });
  const pantsMat = new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.82 });
  const skinMat = new THREE.MeshStandardMaterial({ color: '#e6ba95', roughness: 0.75 });
  const hairMat = new THREE.MeshStandardMaterial({ color: '#18181f', roughness: 0.82 });
  const eyeMat = new THREE.MeshStandardMaterial({ color: '#0f172a', roughness: 0.3 });

  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.25, 0.58, 14), hoodieMat);
  torso.position.y = 0.92;
  torso.castShadow = true;
  torso.userData.zone = 'projects';
  clickableMeshes.push(torso);
  avatar.add(torso);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.23, 16, 14), skinMat);
  head.position.y = 1.46;
  head.castShadow = true;
  avatar.add(head);

  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.245, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.58), hairMat);
  hair.position.set(0, 0.02, 0.02);
  hair.rotation.x = 0.32;
  head.add(hair);

  // Eyes on front (-Z)
  for (const ex of [-0.075, 0.075]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.026, 8, 8), eyeMat);
    eye.position.set(ex, 0.015, -0.215);
    head.add(eye);
  }

  const makeLimb = (r, len, mat, px, py) => {
    const piv = new THREE.Group();
    piv.position.set(px, py, 0);
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.88, len, 10), mat);
    m.position.y = -len / 2;
    m.castShadow = true;
    piv.add(m);
    avatar.add(piv);
    return piv;
  };
  const armL = makeLimb(0.07, 0.44, hoodieMat, -0.28, 1.15);
  const armR = makeLimb(0.07, 0.44, hoodieMat, 0.28, 1.15);
  const legL = makeLimb(0.085, 0.48, pantsMat, -0.11, 0.6);
  const legR = makeLimb(0.085, 0.48, pantsMat, 0.11, 0.6);
  // Proper forward (+X rotation -> -Z direction) seated posture!
  legL.rotation.set(1.38, 0, 0);
  legR.rotation.set(1.38, 0, 0);

  // 4. ZONE: ABOUT & RMIK (North Wall Archive Shelf + Clinical Display Board)
  const aboutGroup = new THREE.Group();
  aboutGroup.position.set(1.5, 0, -3.7);
  studio.add(aboutGroup);

  // Archival cabinet + colorful RMIK binders (ICD-10, SIMRS, E-SOP, Stats)
  addBox(3.4, 0.82, 0.62, deskMat, 0, 0.41, 0, aboutGroup, true, 'about');
  addBox(3.44, 0.06, 0.66, trimMat, 0, 0.84, 0, aboutGroup, false, 'about');
  const binderColors = ['#0d5c51', '#2563eb', '#d97706', '#e11d48', '#0f766e', '#334155'];
  for (let i = 0; i < 6; i++) {
    const bm = new THREE.MeshStandardMaterial({ color: binderColors[i], roughness: 0.65 });
    addBox(0.18, 0.44, 0.34, bm, -1.2 + i * 0.24, 1.09, -0.05, aboutGroup, true, 'about');
  }
  // Glass Archive Display Board above cabinet
  addBox(3.2, 1.32, 0.08, trimMat, 0, 2.05, -0.34, aboutGroup, false, 'about');
  const boardMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.25 });
  addBox(3.04, 1.16, 0.04, boardMat, 0, 2.05, -0.29, aboutGroup, false, 'about');
  for (let i = 0; i < 6; i++) {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const cardM = new THREE.MeshStandardMaterial({ color: binderColors[i], roughness: 0.6 });
    addBox(0.76, 0.38, 0.03, cardM, -0.92 + col * 0.92, 2.3 - row * 0.5, -0.26, aboutGroup, false, 'about');
  }

  // 5. ZONE: CONTACT (Cozy Lounge Sofa + Round Coffee Table + Espresso Bar)
  const contactGroup = new THREE.Group();
  contactGroup.position.set(2.1, 0, 1.5);
  studio.add(contactGroup);

  addBox(4.0, 0.025, 3.2, tealMat, 0, 0.015, 0, contactGroup, false, 'contact');
  // Modern sofa facing -Z
  addBox(2.4, 0.4, 0.78, sofaMat, 0, 0.2, 0.92, contactGroup, true, 'contact');
  addBox(2.4, 0.54, 0.2, sofaMat, 0, 0.62, 1.24, contactGroup, true, 'contact');
  addBox(0.2, 0.54, 0.78, sofaMat, -1.12, 0.36, 0.92, contactGroup, true, 'contact');
  addBox(0.2, 0.54, 0.78, sofaMat, 1.12, 0.36, 0.92, contactGroup, true, 'contact');

  // Round walnut coffee table + cups
  const tbl = new THREE.Mesh(new THREE.CylinderGeometry(0.66, 0.66, 0.06, 24), deskMat);
  tbl.position.set(0, 0.38, -0.25);
  tbl.castShadow = true;
  tbl.receiveShadow = true;
  tbl.userData.zone = 'contact';
  clickableMeshes.push(tbl);
  contactGroup.add(tbl);
  const tblLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.2, 0.36, 12), trimMat);
  tblLeg.position.set(0, 0.18, -0.25);
  contactGroup.add(tblLeg);
  const cup1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.11, 12), new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.4 }));
  cup1.position.set(-0.22, 0.46, -0.28);
  const cup2 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.11, 12), new THREE.MeshStandardMaterial({ color: '#d97706', roughness: 0.45 }));
  cup2.position.set(0.2, 0.46, -0.15);
  contactGroup.add(cup1, cup2);

  // Planters in studio corners
  const addPlanter = (x, z, s = 1) => {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.26 * s, 0.2 * s, 0.46 * s, 14), potMat);
    pot.position.y = 0.23 * s;
    pot.castShadow = true;
    g.add(pot);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + 0.5;
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.28 * s, 10, 8), leafMat);
      leaf.scale.set(1.15, 0.75, 0.85);
      leaf.position.set(Math.cos(a) * 0.18 * s, (0.58 + (i % 2) * 0.16) * s, Math.sin(a) * 0.18 * s);
      leaf.castShadow = true;
      g.add(leaf);
    }
    studio.add(g);
  };
  addPlanter(-4.7, -3.5, 1.1);
  addPlanter(-4.7, 3.5, 0.95);
  addPlanter(4.8, -3.5, 1.0);
  addPlanter(4.8, 3.5, 0.9);

  // Zone highlight ring on floor
  const focusRingMat = new THREE.MeshStandardMaterial({ color: '#0d5c51', emissive: '#3fd4be', emissiveIntensity: 0.6, transparent: true, opacity: 0.7 });
  const focusRing = new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.032, 8, 40), focusRingMat);
  focusRing.rotation.x = Math.PI / 2;
  focusRing.position.set(-2.4, 0.03, -1.3);
  focusRing.visible = false;
  studio.add(focusRing);

  // Camera & state
  const cam = {
    yaw: CAMERA_PRESETS.overview.yaw,
    targetYaw: CAMERA_PRESETS.overview.yaw,
    elev: CAMERA_PRESETS.overview.elev,
    targetElev: CAMERA_PRESETS.overview.elev,
    zoom: CAMERA_PRESETS.overview.zoom,
    targetZoom: CAMERA_PRESETS.overview.zoom,
    look: CAMERA_PRESETS.overview.look.clone(),
    targetLook: CAMERA_PRESETS.overview.look.clone(),
  };

  let state = {
    dark: !!options.dark,
    activeView: options.activeView || 'overview',
    autoOrbit: !!options.autoOrbit,
  };

  const applyViewCamera = (view) => {
    const preset = CAMERA_PRESETS[view] || CAMERA_PRESETS.overview;
    cam.targetLook.copy(preset.look);
    cam.targetYaw = preset.yaw;
    cam.targetElev = preset.elev;
    cam.targetZoom = preset.zoom;

    if (view === 'projects') {
      focusRing.position.set(-2.4, 0.03, -1.35);
      focusRing.visible = true;
    } else if (view === 'about') {
      focusRing.position.set(1.5, 0.03, -3.4);
      focusRing.visible = true;
    } else if (view === 'contact') {
      focusRing.position.set(2.1, 0.03, 1.5);
      focusRing.visible = true;
    } else {
      focusRing.visible = false;
    }
  };
  applyViewCamera(state.activeView);

  const fit = () => {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    const aspect = w / h;
    const halfH = aspect < 0.85 ? 7.2 : 5.3;
    const halfW = halfH * aspect;
    camera.left = -halfW;
    camera.right = halfW;
    camera.top = halfH;
    camera.bottom = -halfH;
    camera.updateProjectionMatrix();
  };
  fit();
  const ro = new ResizeObserver(fit);
  ro.observe(container);

  // Raycaster click + orbit/zoom interactions
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const dom = renderer.domElement;
  dom.style.cursor = 'grab';
  let dragging = false;
  let moved = 0;
  let lastX = 0;
  let lastY = 0;

  const onDown = (e) => {
    if (e.button !== 0) return;
    dragging = true;
    moved = 0;
    lastX = e.clientX;
    lastY = e.clientY;
    dom.setPointerCapture?.(e.pointerId);
    dom.style.cursor = 'grabbing';
  };
  const onMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    moved += Math.abs(dx) + Math.abs(dy);
    if (moved > 3) {
      if (state.autoOrbit && options.onUserInteract) options.onUserInteract();
      cam.targetYaw -= dx * 0.008;
      cam.targetElev = Math.min(20, Math.max(7.2, cam.targetElev + dy * 0.04));
    }
  };
  const onUp = (e) => {
    if (!dragging) return;
    dragging = false;
    dom.releasePointerCapture?.(e.pointerId);
    dom.style.cursor = 'grab';
    if (moved < 6 && options.onSelectZone) {
      const rect = dom.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(clickableMeshes, false);
      const zone = hits[0]?.object?.userData?.zone;
      if (zone) options.onSelectZone(zone);
    }
  };
  const onWheel = (e) => {
    e.preventDefault();
    if (state.autoOrbit && options.onUserInteract) options.onUserInteract();
    const mult = e.deltaY > 0 ? 0.91 : 1.1;
    cam.targetZoom = Math.min(2.2, Math.max(0.72, cam.targetZoom * mult));
  };
  const onDblClick = () => {
    applyViewCamera('overview');
    if (options.onSelectZone) options.onSelectZone('overview');
  };

  dom.addEventListener('pointerdown', onDown);
  dom.addEventListener('pointermove', onMove);
  dom.addEventListener('pointerup', onUp);
  dom.addEventListener('pointercancel', onUp);
  dom.addEventListener('wheel', onWheel, { passive: false });
  dom.addEventListener('dblclick', onDblClick);

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const projTmp = new THREE.Vector3();
  let raf = 0;
  let running = true;
  const t0 = performance.now();

  const animate = (nowMs) => {
    if (!running) return;
    raf = requestAnimationFrame(animate);
    const t = (nowMs - t0) / 1000;
    const isDark = state.dark;

    // Theme lighting transition
    hemi.intensity = isDark ? 0.44 : 1.18;
    hemi.color.set(isDark ? '#8ba2c7' : '#ffffff');
    sun.intensity = isDark ? 0.3 : 1.55;
    sun.color.set(isDark ? '#9eb4e8' : '#fff8ed');
    amb.intensity = isDark ? 0.24 : 0.34;
    glassMat.emissiveIntensity = isDark ? 0.24 : 0.06;
    lampBulbMat.emissiveIntensity = isDark ? 1.75 : 0.18;
    deskLight.intensity = isDark ? 2.6 : 0;
    for (const lm of ledMats) lm.emissiveIntensity = isDark ? 1.5 : 0.2;

    // MaveyyVlgd subtle typing animation
    if (!reduceMotion) {
      armL.rotation.set(1.12 - 0.12 * Math.sin(t * 14), 0, 0.1);
      armR.rotation.set(1.12 - 0.12 * Math.sin(t * 14 + 2.2), 0, -0.1);
      head.rotation.set(-0.1 - 0.03 * Math.sin(t * 2.6), 0.12 * Math.sin(t * 1.1), 0);
      for (const sm of screens) {
        sm.emissiveIntensity = 0.62 + 0.18 * Math.sin(t * 6.5);
      }
      if (focusRing.visible) {
        const sc = 0.97 + 0.04 * Math.sin(t * 3.5);
        focusRing.scale.set(sc, sc, 1);
      }
    } else {
      armL.rotation.set(1.08, 0, 0.1);
      armR.rotation.set(1.08, 0, -0.1);
    }

    if (state.autoOrbit && !dragging && !reduceMotion && state.activeView === 'overview') {
      cam.targetYaw = Math.PI / 4 + 0.32 * Math.sin(t * 0.22);
    }

    const damp = reduceMotion ? 1 : 0.095;
    cam.yaw += (cam.targetYaw - cam.yaw) * damp;
    cam.elev += (cam.targetElev - cam.elev) * damp;
    cam.zoom += (cam.targetZoom - cam.zoom) * damp;
    cam.look.lerp(cam.targetLook, damp);

    const radius = 17.5;
    camera.position.set(
      cam.look.x + radius * Math.sin(cam.yaw),
      cam.look.y + cam.elev,
      cam.look.z + radius * Math.cos(cam.yaw),
    );
    camera.lookAt(cam.look);
    if (Math.abs(camera.zoom - cam.zoom) > 1e-4) {
      camera.zoom = cam.zoom;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    // Project 3D zone pins
    if (options.getPinEl) {
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      for (const pin of ZONE_PINS) {
        const el = options.getPinEl(pin.id);
        if (!el) continue;
        projTmp.copy(pin.pos).project(camera);
        const x = ((projTmp.x + 1) / 2) * cw;
        const y = ((1 - projTmp.y) / 2) * ch;
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      }
    }
  };

  raf = requestAnimationFrame(animate);

  return {
    update(next) {
      const viewChanged = next.activeView && next.activeView !== state.activeView;
      state = { ...state, ...next };
      if (viewChanged) applyViewCamera(state.activeView);
    },
    triggerCam(kind) {
      if (kind === 'zoomIn') cam.targetZoom = Math.min(2.2, cam.targetZoom * 1.22);
      else if (kind === 'zoomOut') cam.targetZoom = Math.max(0.72, cam.targetZoom / 1.22);
      else if (kind === 'reset') applyViewCamera('overview');
    },
    destroy() {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      dom.removeEventListener('pointerdown', onDown);
      dom.removeEventListener('pointermove', onMove);
      dom.removeEventListener('pointerup', onUp);
      dom.removeEventListener('pointercancel', onUp);
      dom.removeEventListener('wheel', onWheel);
      dom.removeEventListener('dblclick', onDblClick);
      woodFloor.dispose();
      woodDesk.dispose();
      renderer.dispose();
      dom.remove();
    },
  };
}

if (typeof window !== 'undefined') {
  window.mountMaveyyStudio3D = mountMaveyyStudio3D;
}
