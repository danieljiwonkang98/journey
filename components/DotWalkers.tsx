"use client";

import { useEffect, useRef } from "react";

const SS = 2;

const params = {
  count: 10,
  speed: 70,
  size: 1.0,
  gap: 11,
};

function rnd(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

type Foot = {
  x: number;
  y: number;
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  lift: number;
  ang: number;
};

type WalkerState = {
  x: number;
  y: number;
  dir: number;
  accent: boolean;
  body: number;
  stepT: number;
  turn: number;
  pause: number;
  nextPause: number;
  clock: number;
  swingIdx: number;
  feet: Foot[];
};

function createWalker(
  walkers: WalkerState[],
  W: number,
  H: number,
  DPR: number,
  inside: boolean,
): WalkerState {
  const m = 140 * DPR;
  const w: WalkerState = {
    x: 0,
    y: 0,
    dir: 0,
    accent: false,
    body: rnd(0.85, 1.25),
    stepT: rnd(0.5, 0.62),
    turn: 0,
    pause: 0,
    nextPause: rnd(4, 12),
    clock: rnd(0, 1),
    swingIdx: 0,
    feet: [],
  };

  if (inside) {
    w.x = rnd(m, W - m);
    w.y = rnd(m, H - m);
    w.dir = rnd(0, Math.PI * 2);
  } else {
    const side = Math.floor(rnd(0, 4));
    if (side === 0) {
      w.x = -m;
      w.y = rnd(0, H);
    } else if (side === 1) {
      w.x = W + m;
      w.y = rnd(0, H);
    } else if (side === 2) {
      w.x = rnd(0, W);
      w.y = -m;
    } else {
      w.x = rnd(0, W);
      w.y = H + m;
    }
    w.dir = Math.atan2(H / 2 - w.y, W / 2 - w.x) + rnd(-0.5, 0.5);
  }

  const accents = walkers.filter((o) => o.accent).length;
  w.accent = accents < 2 && Math.random() < 0.3;

  const scale = () => params.size * w.body * DPR;

  const footTarget = (i: number, lead: number) => {
    const s = scale();
    const side = (i === 0 ? -1 : 1) * 9 * s;
    const cos = Math.cos(w.dir);
    const sin = Math.sin(w.dir);
    return {
      x: w.x + cos * lead - sin * side,
      y: w.y + sin * lead + cos * side,
    };
  };

  w.feet = [0, 1].map((i) => {
    const p = footTarget(i, 0);
    return {
      x: p.x,
      y: p.y,
      sx: p.x,
      sy: p.y,
      tx: p.x,
      ty: p.y,
      lift: 0,
      ang: w.dir,
    };
  });

  return w;
}

function walkerScale(w: WalkerState, DPR: number) {
  return params.size * w.body * DPR;
}

function walkerFootTarget(
  w: WalkerState,
  i: number,
  lead: number,
  DPR: number,
) {
  const s = walkerScale(w, DPR);
  const side = (i === 0 ? -1 : 1) * 9 * s;
  const cos = Math.cos(w.dir);
  const sin = Math.sin(w.dir);
  return {
    x: w.x + cos * lead - sin * side,
    y: w.y + sin * lead + cos * side,
  };
}

function stepWalker(
  w: WalkerState,
  dt: number,
  W: number,
  H: number,
  DPR: number,
  mouse: { x: number; y: number } | null,
) {
  w.nextPause -= dt;
  if (w.nextPause < 0 && w.pause <= 0) {
    w.pause = rnd(0.7, 2.4);
    w.nextPause = rnd(5, 14);
  }

  let fleeing = false;
  let fleeBoost = 1;
  if (mouse) {
    const dx = w.x - mouse.x;
    const dy = w.y - mouse.y;
    const dist = Math.hypot(dx, dy);
    const radius = 220 * DPR;
    if (dist < radius && dist > 1) {
      fleeing = true;
      w.pause = 0;
      const strength = 1 - dist / radius;
      const away = Math.atan2(dy, dx);
      let diff = away - w.dir;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      w.dir += diff * Math.min(1, strength * 8 * dt);
      fleeBoost = 1 + strength * 1.4;
    }
  }

  const walking = w.pause <= 0;
  if (!walking) w.pause -= dt;

  w.turn += rnd(-1.2, 1.2) * dt;
  w.turn *= 0.92;
  if (walking && !fleeing) w.dir += w.turn * dt * 2;

  const scale = walkerScale(w, DPR);
  const v = walking
    ? ((params.speed * scale) / DPR) * DPR * 0.9 * fleeBoost
    : 0;
  w.x += Math.cos(w.dir) * v * dt;
  w.y += Math.sin(w.dir) * v * dt;

  if (walking) {
    w.clock += dt / w.stepT;
    if (w.clock >= 1) {
      w.clock -= 1;
      w.swingIdx = 1 - w.swingIdx;
      const f = w.feet[w.swingIdx];
      f.sx = f.x;
      f.sy = f.y;
    }
    const f = w.feet[w.swingIdx];
    const t = w.clock;
    const lead = 15 * scale + v * w.stepT * 0.5;
    const tgt = walkerFootTarget(w, w.swingIdx, lead, DPR);
    const e = t * t * (3 - 2 * t);
    f.x = lerp(f.sx, tgt.x, e);
    f.y = lerp(f.sy, tgt.y, e);
    f.lift = Math.sin(Math.PI * t);
    f.ang = w.dir;
    w.feet[1 - w.swingIdx].lift = 0;
  } else {
    w.feet[0].lift = 0;
    w.feet[1].lift = 0;
  }

  const m = 180 * DPR;
  if (w.x < -m || w.x > W + m || w.y < -m || w.y > H + m) {
    const respawned = createWalker([], W, H, DPR, false);
    Object.assign(w, respawned);
  }
}

function drawShoe(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  ang: number,
  s: number,
  lift: number,
  sf: number,
  col: string,
) {
  const blur = lift * 2.6 * SS;
  const grow = 1 + lift * 0.55;
  const alpha = 1 - lift * 0.5;
  const L = 26 * s * sf * grow;
  const Wd = 10 * s * sf * grow;

  g.save();
  g.translate(x * sf, y * sf);
  g.rotate(ang);
  g.filter = blur > 0.15 ? `blur(${blur.toFixed(2)}px)` : "none";
  g.globalAlpha = alpha;
  g.fillStyle = col;
  g.beginPath();
  g.ellipse(L * 0.18, 0, L * 0.36, Wd * 0.5, 0, 0, 6.2832);
  g.fill();
  g.beginPath();
  g.ellipse(-L * 0.33, 0, Wd * 0.4, Wd * 0.44, 0, 0, 6.2832);
  g.fill();
  g.restore();
}

function capsule(
  g: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  w: number,
  blur: number,
  alpha: number,
  col: string,
) {
  const b = blur * SS;
  g.filter = b > 0.15 ? `blur(${b.toFixed(2)}px)` : "none";
  g.globalAlpha = alpha;
  g.strokeStyle = col;
  g.lineCap = "round";
  g.lineWidth = Math.max(w, 0.6);
  g.beginPath();
  g.moveTo(x1, y1);
  g.lineTo(x2, y2);
  g.stroke();
}

function drawFigure(
  g: CanvasRenderingContext2D,
  w: WalkerState,
  sf: number,
  col: string,
  DPR: number,
) {
  const s = walkerScale(w, DPR);
  const u = s * sf;
  const cos = Math.cos(w.dir);
  const sin = Math.sin(w.dir);
  const sway = Math.sin((w.swingIdx + w.clock) * Math.PI) * 2.2 * s;
  const bx = (w.x - sin * sway) * sf;
  const by = (w.y + cos * sway) * sf;

  g.save();
  g.fillStyle = col;

  g.filter = `blur(${5 * SS}px)`;
  g.globalAlpha = 0.3;
  g.beginPath();
  g.ellipse(bx, by, 8 * u, 8 * u, 0, 0, 6.2832);
  g.fill();

  g.save();
  g.translate(bx, by);
  g.rotate(w.dir);
  g.filter = `blur(${3.6 * SS}px)`;
  g.globalAlpha = 0.42;
  g.beginPath();
  g.ellipse(0, 0, 12 * u, 21 * u, 0, 0, 6.2832);
  g.fill();
  g.restore();

  for (let i = 0; i < 2; i++) {
    const f = w.feet[i];
    const lead = ((f.x - w.x) * cos + (f.y - w.y) * sin) / (18 * s);
    const swing = Math.max(-1, Math.min(1, -lead));
    const side = (i === 0 ? -1 : 1) * 15 * s;
    const shx = (w.x - sin * side) * sf;
    const shy = (w.y + cos * side) * sf;
    const hx = (w.x - sin * side * 1.15 + cos * swing * 20 * s) * sf;
    const hy = (w.y + cos * side * 1.15 + sin * swing * 20 * s) * sf;
    capsule(g, shx, shy, hx, hy, 6 * u, 3.2, 0.34, col);
  }

  g.save();
  g.translate(bx, by);
  g.rotate(w.dir);
  g.filter = `blur(${2.8 * SS}px)`;
  g.globalAlpha = 0.45;
  g.beginPath();
  g.ellipse(0, 0, 9 * u, 13 * u, 0, 0, 6.2832);
  g.fill();
  g.restore();

  for (let i = 0; i < 2; i++) {
    const f = w.feet[i];
    const side = (i === 0 ? -1 : 1) * 6 * s;
    const hipx = (w.x - sin * side) * sf;
    const hipy = (w.y + cos * side) * sf;
    const fx = (f.x - Math.cos(f.ang) * 8 * s) * sf;
    const fy = (f.y - Math.sin(f.ang) * 8 * s) * sf;
    const bend = (4 + f.lift * 8) * s;
    const kx = (fx + hipx) / 2 + Math.cos(w.dir) * bend * sf;
    const ky = (fy + hipy) / 2 + Math.sin(w.dir) * bend * sf;
    const liftBlur = f.lift * 1.4;
    capsule(g, kx, ky, hipx, hipy, 7 * u, 2.4 + liftBlur * 0.5, 0.42, col);
    capsule(
      g,
      fx,
      fy,
      kx,
      ky,
      5.5 * u,
      1.2 + liftBlur,
      0.55 - f.lift * 0.15,
      col,
    );
  }

  g.restore();
  g.filter = "none";
  g.globalAlpha = 1;
}

export default function DotWalkers({ bright = false }: { bright?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const field = document.createElement("canvas");
    const fctx = field.getContext("2d");
    const fieldLo = document.createElement("canvas");
    const loctx = fieldLo.getContext("2d", { willReadFrequently: true });
    if (!fctx || !loctx) return;

    const ctx2 = ctx;
    const fctx2 = fctx;
    const loctx2 = loctx;

    let W = 0;
    let H = 0;
    let DPR = 1;
    let cols = 0;
    let rows = 0;
    let mouse: { x: number; y: number } | null = null;
    const walkers: WalkerState[] = [];
    let rafId = 0;
    let last = performance.now();

    function rebuildField() {
      cols = Math.ceil(W / (params.gap * DPR)) + 1;
      rows = Math.ceil(H / (params.gap * DPR)) + 1;
      field.width = cols * SS;
      field.height = rows * SS;
      fieldLo.width = cols;
      fieldLo.height = rows;
      loctx2.imageSmoothingEnabled = true;
    }

    function resize() {
      const rect = container!.getBoundingClientRect();
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas!.width = Math.round(rect.width * DPR);
      H = canvas!.height = Math.round(rect.height * DPR);
      canvas!.style.width = `${rect.width}px`;
      canvas!.style.height = `${rect.height}px`;
      rebuildField();
    }

    function setCount(n: number) {
      while (walkers.length < n) {
        walkers.push(createWalker(walkers, W, H, DPR, true));
      }
      walkers.length = n;
    }

    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      for (const w of walkers) stepWalker(w, dt, W, H, DPR, mouse);

      const sf = SS / (params.gap * DPR);
      fctx2.filter = "none";
      fctx2.globalAlpha = 1;
      fctx2.globalCompositeOperation = "source-over";
      fctx2.fillStyle = "#000";
      fctx2.fillRect(0, 0, cols * SS, rows * SS);
      fctx2.globalCompositeOperation = "lighter";
      for (const w of walkers) {
        const col = w.accent ? "#00ff00" : "#ff0000";
        drawFigure(fctx2, w, sf, col, DPR);
        for (const f of w.feet) {
          drawShoe(
            fctx2,
            f.x,
            f.y,
            f.ang,
            walkerScale(w, DPR),
            f.lift,
            sf,
            col,
          );
        }
      }
      fctx2.globalCompositeOperation = "source-over";

      loctx2.drawImage(field, 0, 0, cols, rows);
      const img = loctx2.getImageData(0, 0, cols, rows).data;

      const inv = bright;
      ctx2.fillStyle = inv ? "#ffffff" : "#000";
      ctx2.fillRect(0, 0, W, H);

      const gap = params.gap * DPR;
      const maxR = gap * 0.47;
      const ambient = 0.05;

      const base = inv ? [10, 10, 10] : [255, 255, 255];
      const AC = [0x53, 0xaa, 0xff];
      const pal: string[] = [];
      for (let k = 0; k <= 10; k++) {
        const t = k / 10;
        pal.push(
          `rgb(${Math.round(base[0] + (AC[0] - base[0]) * t)},${Math.round(base[1] + (AC[1] - base[1]) * t)},${Math.round(base[2] + (AC[2] - base[2]) * t)})`,
        );
      }

      for (let j = 0; j < rows; j++) {
        const y = j * gap;
        for (let i = 0; i < cols; i++) {
          const idx = (j * cols + i) * 4;
          const nB = img[idx] / 255;
          const aB = img[idx + 1] / 255;
          let b = nB + aB + ambient;
          if (b > 1) b = 1;
          const r = maxR * Math.pow(b, 0.6);
          if (r < 0.35) continue;
          const t = aB > 0.003 ? aB / (nB + aB) : 0;
          ctx2.fillStyle = pal[Math.round(t * 10)];
          ctx2.globalAlpha = Math.min(0.22 + b, 1);
          ctx2.beginPath();
          ctx2.arc(i * gap, y, r, 0, 6.2832);
          ctx2.fill();
        }
      }
      ctx2.globalAlpha = 1;
      rafId = requestAnimationFrame(frame);
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = container!.getBoundingClientRect();
      mouse = {
        x: (e.clientX - rect.left) * DPR,
        y: (e.clientY - rect.top) * DPR,
      };
    };

    const onPointerLeave = () => {
      mouse = null;
    };

    resize();
    setCount(params.count);
    rafId = requestAnimationFrame(frame);

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    // Listen on window so flee-from-cursor still works when the canvas
    // sits under scrolling content with pointer-events-none.
    window.addEventListener("pointermove", onPointerMove);
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("blur", onPointerLeave);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave,
      );
      window.removeEventListener("blur", onPointerLeave);
    };
  }, [bright]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
