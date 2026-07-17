import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Full-viewport fixed overlay — the snitch wanders the screen
 * and stays visible during scroll. pointer-events:none so the
 * page remains fully interactive.
 */
export function SnitchCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let frameId: number;
    let initialized = false;

    function init(vw: number, vh: number, mount: HTMLDivElement) {
      if (initialized) return;
      initialized = true;

      // ── Scene / Camera / Renderer ──────────────────────────────
      const scene = new THREE.Scene();
      const aspect = vw / vh;
      const camZ = 8;
      const camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 100);
      camera.position.z = camZ;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(vw, vh, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      // CSS fills the fixed inset-0 container
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      mount.appendChild(renderer.domElement);

      // visible world extents at z=0 for this camera
      const halfH = camZ * Math.tan((42 / 2) * (Math.PI / 180));
      const halfW = halfH * aspect;

      // ── Lights ────────────────────────────────────────────────
      scene.add(new THREE.AmbientLight(0xffe4aa, 3.5));

      const key = new THREE.DirectionalLight(0xffd060, 3.0);
      key.position.set(4, 5, 6);
      scene.add(key);

      const fill = new THREE.DirectionalLight(0xffcc88, 1.2);
      fill.position.set(-3, 2, 4);
      scene.add(fill);

      // Point light attached to the snitch — always self-lit
      const selfLight = new THREE.PointLight(0xffd080, 4.0, 6);
      selfLight.position.set(0, 0, 1.5); // slightly in front

      // ── Body ──────────────────────────────────────────────────
      const bodyR = 0.55;
      const bodyGeo = new THREE.SphereGeometry(bodyR, 64, 64);
      const bodyMat = new THREE.MeshPhongMaterial({
        color: 0xc88010,
        specular: 0xfff0a0,
        shininess: 160,
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);

      // Engraved detail — latitude rings only (meridian tori create ugly star artifacts)
      const engraveMat = new THREE.MeshPhongMaterial({
        color: 0x5a3400,
        specular: 0x996010,
        shininess: 60,
      });
      // Subtle latitude lines at ±35° and equator
      const engraveAngles = [-50, -28, 0, 28, 50];
      for (const deg of engraveAngles) {
        const rad = (deg * Math.PI) / 180;
        const r = bodyR * Math.cos(rad);
        const y = bodyR * Math.sin(rad);
        // thinner tube so they read as fine lines
        const g = new THREE.TorusGeometry(r, 0.008, 8, 80);
        const m = new THREE.Mesh(g, engraveMat);
        m.position.y = y;
        body.add(m);
      }

      // Prominent equatorial belt (the wing-mount ring seen on real snitch)
      const beltMat = new THREE.MeshPhongMaterial({
        color: 0x8a5000,
        specular: 0xffcc44,
        shininess: 100,
      });
      const belt = new THREE.Mesh(
        new THREE.TorusGeometry(bodyR + 0.01, 0.025, 10, 80),
        beltMat,
      );
      body.add(belt);

      // ── Wing factory ──────────────────────────────────────────
      // Color palette matching the real snitch: golden amber
      const memColor = 0xc8840a;
      const spineColor = 0x9a6008;
      const spineMat = new THREE.MeshPhongMaterial({
        color: spineColor,
        specular: 0xffcc44,
        shininess: 70,
      });

      function makeWingSpines(side: 1 | -1) {
        const group = new THREE.Group();
        const spineCount = 9;

        for (let i = 0; i < spineCount; i++) {
          const t = i / (spineCount - 1); // 0..1
          // fan: top spine is nearly horizontal, bottom sweeps down
          const startAngle = THREE.MathUtils.lerp(0.35, -0.45, t); // radians from horizontal
          const tipX = side * THREE.MathUtils.lerp(2.8, 1.9, Math.abs(t - 0.5) * 2.0);
          const tipY = Math.sin(startAngle) * 1.2;
          const ctrlX = side * THREE.MathUtils.lerp(1.3, 1.0, t);
          const ctrlY = THREE.MathUtils.lerp(0.7, -0.5, t);

          const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(ctrlX, ctrlY, 0.05 * (i % 2 ? 1 : -1)),
            new THREE.Vector3(tipX, tipY, 0),
          );
          const tubeR = THREE.MathUtils.lerp(0.028, 0.014, t); // thicker near root
          const geo = new THREE.TubeGeometry(curve, 24, tubeR, 5, false);
          group.add(new THREE.Mesh(geo, spineMat));
        }

        // Membrane between spines — layered fans for feather-like look
        for (let layer = 0; layer < 3; layer++) {
          const tStart = layer / 3;
          const tEnd = (layer + 1) / 3;
          const shape = new THREE.Shape();
          shape.moveTo(0, 0);

          const steps = 6;
          for (let s = 0; s <= steps; s++) {
            const tt = THREE.MathUtils.lerp(tStart, tEnd, s / steps);
            const ang = THREE.MathUtils.lerp(0.35, -0.45, tt);
            const len = THREE.MathUtils.lerp(2.8, 2.0, Math.abs(tt - 0.5) * 2);
            shape.lineTo(side * len * Math.cos(ang), Math.sin(ang) * 1.2);
          }
          shape.lineTo(0, 0);

          const geo = new THREE.ShapeGeometry(shape, 12);
          const mat = new THREE.MeshPhongMaterial({
            color: memColor,
            specular: 0xffd060,
            shininess: 30,
            transparent: true,
            opacity: THREE.MathUtils.lerp(0.80, 0.60, layer / 2),
            side: THREE.DoubleSide,
          });
          group.add(new THREE.Mesh(geo, mat));
        }

        return group;
      }

      const leftWing = makeWingSpines(-1);
      const rightWing = makeWingSpines(1);

      // ── Assemble snitch ───────────────────────────────────────
      const snitch = new THREE.Group();
      snitch.add(body, leftWing, rightWing, selfLight);
      // 80% smaller than the original 0.9 scale
      snitch.scale.setScalar(0.18);
      scene.add(snitch);

      // ── AI state — idle / dart ─────────────────────────────────
      const pos = new THREE.Vector2(0, 0.3); // current position in world XY
      const target = new THREE.Vector2(0, 0);

      // Safe wander bounds (leave margin so snitch stays on screen)
      const mx = halfW * 0.72;
      const my = halfH * 0.72;

      function pickTarget() {
        // Bias toward non-corner areas
        return new THREE.Vector2(
          (Math.random() * 2 - 1) * mx,
          (Math.random() * 2 - 1) * my,
        );
      }

      let mode: "idle" | "dart" = "idle";
      let idleTimer = 0;
      let nextDart = 1.5 + Math.random() * 2.5; // seconds until first dart
      let dartProgress = 0;
      let dartDuration = 0.0;

      // Current dart start/end
      let dartFrom = pos.clone();
      let dartTo = target.clone();

      // Wing flap speed — changes based on mode
      let flapSpeed = 1.8;

      // ── Clock / Animate ───────────────────────────────────────
      const startTime = performance.now();
      let prevT = 0;

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const t = (performance.now() - startTime) / 1000;
        const dt = Math.min(t - prevT, 0.05); // cap delta
        prevT = t;

        // — AI tick —
        if (mode === "idle") {
          idleTimer += dt;
          // gentle hover drift
          pos.x += Math.sin(t * 0.6 + 1.2) * 0.0012;
          pos.y += Math.sin(t * 0.8) * 0.001;

          flapSpeed = THREE.MathUtils.lerp(flapSpeed, 1.4, dt * 3);

          if (idleTimer >= nextDart) {
            // Start a dart
            mode = "dart";
            dartFrom.copy(pos);
            const newTarget = pickTarget();
            dartTo.copy(newTarget);
            // Duration proportional to distance (fast!)
            const dist = dartFrom.distanceTo(dartTo);
            dartDuration = THREE.MathUtils.clamp(dist * 0.18, 0.25, 0.7);
            dartProgress = 0;
          }
        } else {
          // Darting — ease-in-out along the path
          dartProgress += dt / dartDuration;
          const ease = dartProgress < 0.5
            ? 4 * dartProgress ** 3
            : 1 - (-2 * dartProgress + 2) ** 3 / 2;
          const clamped = THREE.MathUtils.clamp(ease, 0, 1);

          pos.x = THREE.MathUtils.lerp(dartFrom.x, dartTo.x, clamped);
          pos.y = THREE.MathUtils.lerp(dartFrom.y, dartTo.y, clamped);

          flapSpeed = THREE.MathUtils.lerp(flapSpeed, 5.5, dt * 8);

          if (dartProgress >= 1) {
            mode = "idle";
            idleTimer = 0;
            nextDart = 1.8 + Math.random() * 3.0;
          }
        }

        // — Apply position to snitch —
        snitch.position.x = pos.x;
        snitch.position.y = pos.y;

        // Bank/tilt based on velocity direction
        const dx = dartTo.x - dartFrom.x;
        const dy = dartTo.y - dartFrom.y;
        if (mode === "dart") {
          const targetRollZ = -dx * 0.25;
          const targetTiltX = -dy * 0.15;
          snitch.rotation.z = THREE.MathUtils.lerp(snitch.rotation.z, targetRollZ, dt * 6);
          snitch.rotation.x = THREE.MathUtils.lerp(snitch.rotation.x, targetTiltX, dt * 6);
        } else {
          snitch.rotation.z = THREE.MathUtils.lerp(snitch.rotation.z, 0, dt * 2);
          snitch.rotation.x = THREE.MathUtils.lerp(snitch.rotation.x, 0, dt * 2);
        }

        // Body spin (always)
        body.rotation.y = t * 0.5;
        body.rotation.z = t * 0.12;

        // Wing flap — asymmetric for organic feel
        const flapT = t * flapSpeed;
        leftWing.rotation.z = Math.sin(flapT) * 0.22 + 0.05;
        rightWing.rotation.z = -Math.sin(flapT + 0.25) * 0.22 - 0.05;
        leftWing.rotation.x = Math.sin(flapT * 0.7) * 0.08;
        rightWing.rotation.x = Math.sin(flapT * 0.7 + 0.3) * 0.08;

        // Subtle y bob during idle
        if (mode === "idle") {
          snitch.position.y += Math.sin(t * 2.2) * 0.018;
        }

        renderer.render(scene, camera);
      };
      animate();

      // Resize
      const onResize = () => {
        const nw = window.innerWidth;
        const nh = window.innerHeight;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh, false);
      };
      window.addEventListener("resize", onResize);

      // Cleanup stored on mount
      (mount as any).__cleanup = () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      };
    }

    // Get viewport size. In some iframe/headless environments window.innerWidth = 0,
    // fall back to screen dimensions or mount's rendered size.
    const w = window.innerWidth || mount.offsetWidth || screen.width || 1280;
    const h = window.innerHeight || mount.offsetHeight || screen.height || 800;
    init(w, h, mount);

    return () => {
      const cleanup = (mount as any).__cleanup;
      if (cleanup) cleanup();
      delete (mount as any).__cleanup;
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100dvw",
        height: "100dvh",
        zIndex: 25,
      }}
    />
  );
}
