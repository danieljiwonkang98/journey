"use client";

import { useEffect, useRef } from "react";

const PARAMS = {
  pitch: 50,
  speed: 1.2,
  amp: 42,
  reach: 110,
} as const;

// Fixed per-bar jitter so lengths vary like the reference
const JIT: [number, number, number][] = [];
{
  let seed = 13;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 600; i++) {
    JIT.push([rand() * 2 - 1, rand() * 2 - 1, rand() * 6.28]);
  }
}

function wave(i: number, t: number, layer: 0 | 1 | 2) {
  if (layer === 0) {
    return (
      Math.sin(i * 0.045 + t * 0.3) * 1.0 +
      Math.sin(i * 0.021 - t * 0.17 + 2.1) * 0.7
    );
  }
  if (layer === 1) {
    return (
      Math.sin(i * 0.55 + t * 0.55 + JIT[i % 600]![2]) * 0.55 +
      Math.sin(i * 0.19 - t * 0.33 + 1.3) * 0.45 +
      JIT[i % 600]![0] * 0.45
    );
  }
  return (
    Math.sin(i * 0.48 - t * 0.47 + JIT[(i + 37) % 600]![2]) * 0.55 +
    Math.sin(i * 0.16 + t * 0.28 + 4.0) * 0.45 +
    JIT[(i + 37) % 600]![1] * 0.45
  );
}

function clamp(v: number, a: number, b: number) {
  return Math.min(Math.max(v, a), b);
}

/** Black→white zipper wave — short transition strip, not a full viewport. */
export default function WaveBarsTransition() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let DPR = 1;
    let t = 0;
    let last = performance.now();
    let rafId = 0;
    let running = false;

    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth, clientHeight } = wrap;
      W = canvas.width = clientWidth * DPR;
      H = canvas.height = clientHeight * DPR;
      canvas.style.width = `${clientWidth}px`;
      canvas.style.height = `${clientHeight}px`;
    };

    const draw = (now: number) => {
      if (!running) return;
      rafId = requestAnimationFrame(draw);

      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt * PARAMS.speed;

      const tw = PARAMS.pitch * DPR * 0.5;
      const r = tw / 2;
      const amp = PARAMS.amp * DPR;
      const reach = PARAMS.reach * DPR;
      const n = Math.ceil(W / tw) + 2;
      const baseY = H * 0.45;

      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.moveTo(-tw, 0);

      for (let k = -1; k <= n; k++) {
        const x = k * tw;
        const mid = baseY + wave(k * 0.5, t, 0) * amp;
        if ((k & 1) === 0) {
          const f = clamp(
            0.15 + 0.85 * (0.5 + 0.5 * wave(k, t, 1)),
            0.12,
            0.95,
          );
          const tip = mid + reach * f;
          ctx.lineTo(x, tip - r);
          ctx.arc(x + r, tip - r, r, Math.PI, 0, true);
        } else {
          const f = clamp(
            0.15 + 0.85 * (0.5 + 0.5 * wave(k, t, 2)),
            0.12,
            0.95,
          );
          const tip = mid - reach * f;
          ctx.lineTo(x, tip + r);
          ctx.arc(x + r, tip + r, r, Math.PI, 0, false);
        }
      }

      ctx.lineTo((n + 1) * tw, 0);
      ctx.closePath();
      ctx.fill();
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      rafId = requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) start();
        else stop();
      },
      { threshold: 0.05 },
    );
    io.observe(wrap);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative z-10 h-[min(42vh,420px)] w-full bg-black"
      aria-hidden
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
