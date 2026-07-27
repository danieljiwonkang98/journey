"use client";

import { useEffect, useRef } from "react";

const SS = 2;

const WALKER_COLORS = ["#F4E654", "#A66BFB", "#2CE798", "#2D91F3", "#E2838C"];
/** Hero scene: mostly white walkers, with a few blue accents. */
const HERO_WHITE = "#FFFFFF";
const HERO_BLUE = "#2D91F3";
const HERO_ACCENT_MAX = 2;

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
  color: string;
  body: number;
  stepT: number;
  turn: number;
  pause: number;
  nextPause: number;
  clock: number;
  swingIdx: number;
  scatterAngle: number;
  feet: Foot[];
};

function pickWalkerColor(
  palette: "hero" | "spectrum",
  others: WalkerState[],
): string {
  if (palette === "spectrum") {
    return WALKER_COLORS[Math.floor(Math.random() * WALKER_COLORS.length)];
  }
  // Hero: mostly white footsteps; at most one or two blue accents.
  const accents = others.filter((o) => o.color === HERO_BLUE).length;
  if (accents < HERO_ACCENT_MAX && Math.random() < 0.3) return HERO_BLUE;
  return HERO_WHITE;
}

function createWalker(
  W: number,
  H: number,
  DPR: number,
  inside: boolean,
  palette: "hero" | "spectrum",
  others: WalkerState[] = [],
): WalkerState {
  const m = 140 * DPR;
  const w: WalkerState = {
    x: 0,
    y: 0,
    dir: 0,
    color: pickWalkerColor(palette, others),
    body: rnd(0.85, 1.25),
    stepT: rnd(0.5, 0.62),
    turn: 0,
    pause: 0,
    nextPause: rnd(4, 12),
    clock: rnd(0, 1),
    swingIdx: 0,
    scatterAngle: 0,
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

type MouseInfluence =
  | { kind: "attract"; x: number; y: number }
  | { kind: "scatter"; x: number; y: number };

function stepWalker(
  w: WalkerState,
  dt: number,
  W: number,
  H: number,
  DPR: number,
  influence: MouseInfluence | null,
  palette: "hero" | "spectrum",
  walkers: WalkerState[],
) {
  w.nextPause -= dt;
  if (w.nextPause < 0 && w.pause <= 0) {
    w.pause = rnd(0.7, 2.4);
    w.nextPause = rnd(5, 14);
  }

  let steered = false;
  let speedBoost = 1;
  if (influence?.kind === "attract") {
    const dx = influence.x - w.x;
    const dy = influence.y - w.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 24 * DPR) {
      steered = true;
      w.pause = 0;
      const strength = Math.min(1, dist / (320 * DPR));
      const toward = Math.atan2(dy, dx);
      let diff = toward - w.dir;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      w.dir += diff * Math.min(1, (0.45 + strength * 0.55) * 8 * dt);
      speedBoost = 0.85;
    }
  } else if (influence?.kind === "scatter") {
    steered = true;
    w.pause = 0;
    const heading = w.scatterAngle;
    let diff = heading - w.dir;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    // Ease into the new heading instead of snapping.
    w.dir += diff * Math.min(1, 2.2 * dt);
    speedBoost = 1.05;
  }

  const walking = w.pause <= 0;
  if (!walking) w.pause -= dt;

  w.turn += rnd(-1.2, 1.2) * dt;
  w.turn *= 0.92;
  if (walking && !steered) w.dir += w.turn * dt * 2;

  const scale = walkerScale(w, DPR);
  const v = walking
    ? ((params.speed * scale) / DPR) * DPR * 0.9 * speedBoost
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
    const others = walkers.filter((o) => o !== w);
    const respawned = createWalker(W, H, DPR, false, palette, others);
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

    // Hero (first scene): white + 1–2 blue. Contact/bright keeps the spectrum.
    const palette: "hero" | "spectrum" = bright ? "spectrum" : "hero";

    let W = 0;
    let H = 0;
    let DPR = 1;
    let cols = 0;
    let rows = 0;
    let mouse: { x: number; y: number } | null = null;
    let lastMouseMove = 0;
    let mode: "free" | "attract" | "scatter" = "free";
    let scatterOrigin: { x: number; y: number } | null = null;
    let scatterUntil = 0;
    const MOUSE_IDLE_MS = 1500;
    const SCATTER_MS = 2200;
    const walkers: WalkerState[] = [];
    let rafId = 0;
    let last = performance.now();

    function beginScatter(origin: { x: number; y: number }, now: number) {
      mode = "scatter";
      scatterOrigin = origin;
      scatterUntil = now + SCATTER_MS;
      // Aim at a random cardinal; steering eases toward it over time.
      const cardinals = [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2];
      for (const w of walkers) {
        let heading = cardinals[Math.floor(Math.random() * cardinals.length)];
        // Prefer a heading that isn't nearly the current direction.
        let tries = 0;
        while (tries < 4) {
          let diff = heading - w.dir;
          while (diff > Math.PI) diff -= Math.PI * 2;
          while (diff < -Math.PI) diff += Math.PI * 2;
          if (Math.abs(diff) > 0.6) break;
          heading = cardinals[Math.floor(Math.random() * cardinals.length)];
          tries++;
        }
        w.scatterAngle = heading;
      }
    }

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
      const nextW = Math.round(rect.width * DPR);
      const nextH = Math.round(rect.height * DPR);
      // Skip 0×0 mounts (e.g. display:none) — resizing to 0 can stall paint.
      if (nextW < 1 || nextH < 1) {
        W = 0;
        H = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
        return;
      }
      W = canvas!.width = nextW;
      H = canvas!.height = nextH;
      canvas!.style.width = `${rect.width}px`;
      canvas!.style.height = `${rect.height}px`;
      rebuildField();
      if (!rafId) {
        last = performance.now();
        rafId = requestAnimationFrame(frame);
      }
    }

    function setCount(n: number) {
      while (walkers.length < n) {
        walkers.push(createWalker(W, H, DPR, true, palette, walkers));
      }
      walkers.length = n;

      // Hero: guarantee one or two blue accents among mostly white walkers.
      if (palette === "hero" && walkers.length > 0) {
        const target = Math.min(
          HERO_ACCENT_MAX,
          Math.max(1, Math.floor(Math.random() * HERO_ACCENT_MAX) + 1),
        );
        for (const w of walkers) w.color = HERO_WHITE;
        const indices = walkers.map((_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        for (let k = 0; k < target; k++) {
          walkers[indices[k]].color = HERO_BLUE;
        }
      }
    }

    function frame(now: number) {
      if (W < 1 || H < 1) {
        rafId = 0;
        return;
      }

      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const mouseActive = !!mouse && now - lastMouseMove < MOUSE_IDLE_MS;
      if (mouseActive) {
        mode = "attract";
        scatterOrigin = null;
      } else if (mode === "attract" && mouse) {
        beginScatter(mouse, now);
      } else if (mode === "scatter" && now >= scatterUntil) {
        mode = "free";
        scatterOrigin = null;
      }

      let influence: MouseInfluence | null = null;
      if (mode === "attract" && mouse) {
        influence = { kind: "attract", x: mouse.x, y: mouse.y };
      } else if (mode === "scatter" && scatterOrigin) {
        influence = {
          kind: "scatter",
          x: scatterOrigin.x,
          y: scatterOrigin.y,
        };
      }

      for (const w of walkers) {
        stepWalker(w, dt, W, H, DPR, influence, palette, walkers);
      }

      const sf = SS / (params.gap * DPR);
      fctx2.filter = "none";
      fctx2.globalAlpha = 1;
      fctx2.globalCompositeOperation = "source-over";
      fctx2.fillStyle = "#000";
      fctx2.fillRect(0, 0, cols * SS, rows * SS);
      fctx2.globalCompositeOperation = "lighter";
      for (const w of walkers) {
        drawFigure(fctx2, w, sf, w.color, DPR);
        for (const f of w.feet) {
          drawShoe(
            fctx2,
            f.x,
            f.y,
            f.ang,
            walkerScale(w, DPR),
            f.lift,
            sf,
            w.color,
          );
        }
      }
      fctx2.globalCompositeOperation = "source-over";

      loctx2.drawImage(field, 0, 0, cols, rows);
      const img = loctx2.getImageData(0, 0, cols, rows).data;

      ctx2.fillStyle = bright ? "#ffffff" : "#000";
      ctx2.fillRect(0, 0, W, H);

      const gap = params.gap * DPR;
      const maxR = gap * 0.47;
      const ambient = 0.05;
      const gridCol = bright ? "rgb(12,12,12)" : "rgb(210,210,210)";

      for (let j = 0; j < rows; j++) {
        const y = j * gap;
        for (let i = 0; i < cols; i++) {
          const idx = (j * cols + i) * 4;
          const wr = img[idx];
          const wg = img[idx + 1];
          const wb = img[idx + 2];
          const maxC = Math.max(wr, wg, wb);
          let b = maxC / 255 + ambient;
          if (b > 1) b = 1;
          const r = maxR * Math.pow(b, 0.6);
          if (r < 0.35) continue;
          if (maxC < 1) {
            ctx2.fillStyle = gridCol;
          } else {
            const s = 255 / maxC;
            ctx2.fillStyle = `rgb(${Math.round(wr * s)},${Math.round(wg * s)},${Math.round(wb * s)})`;
          }
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
      lastMouseMove = performance.now();
    };

    const onPointerLeave = () => {
      if (mode === "attract" && mouse) {
        beginScatter(mouse, performance.now());
      }
      mouse = null;
    };

    resize();
    setCount(params.count);
    if (!rafId) {
      rafId = requestAnimationFrame(frame);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    // Listen on window so seek-to-cursor still works when the canvas
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
