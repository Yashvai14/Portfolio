"use client";

import { useEffect, useRef } from "react";

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId: number;

    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) return;

    // Capture as non-null for use inside closures (TypeScript narrowing doesn't
    // propagate across nested function boundaries for mutable variables).
    const glCtx: WebGLRenderingContext = gl;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 v_texCoord;

      void main() {
        vec2 uv = v_texCoord;
        vec2 mouse = u_mouse / u_resolution;
        
        // Very subtle, slow flow animation
        float color1 = sin(uv.x * 8.0 + u_time * 0.3) * 0.5 + 0.5;
        float color2 = cos(uv.y * 6.0 - u_time * 0.2) * 0.5 + 0.5;
        
        // Deep dark base with barely-there accents
        vec3 baseColor = vec3(0.020, 0.031, 0.086); // Deep #050816 navy
        vec3 accent1 = vec3(0.10, 0.22, 0.45);      // Very muted blue
        vec3 accent2 = vec3(0.22, 0.10, 0.35);      // Very muted purple
        
        // Mouse glow — extremely subtle, tight radius
        float dist = distance(uv, mouse);
        float glow = smoothstep(0.25, 0.0, dist) * 0.06;
        
        // Mix with very small coefficients so color stays mostly base
        vec3 color = mix(baseColor, accent1, color1 * 0.06);
        color = mix(color, accent2, color2 * 0.05);
        color += glow * accent1;
        
        // Apply overall darkening factor
        color *= 0.9;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function compileShader(type: number, src: string): WebGLShader | null {
      const s = glCtx.createShader(type);
      if (!s) return null;
      glCtx.shaderSource(s, src);
      glCtx.compileShader(s);
      if (!glCtx.getShaderParameter(s, glCtx.COMPILE_STATUS)) {
        console.error("Shader compile error:", glCtx.getShaderInfoLog(s));
        glCtx.deleteShader(s);
        return null;
      }
      return s;
    }

    const vsShader = compileShader(glCtx.VERTEX_SHADER, vs);
    const fsShader = compileShader(glCtx.FRAGMENT_SHADER, fs);
    if (!vsShader || !fsShader) return;

    const prog = glCtx.createProgram();
    if (!prog) return;
    glCtx.attachShader(prog, vsShader);
    glCtx.attachShader(prog, fsShader);
    glCtx.linkProgram(prog);

    if (!glCtx.getProgramParameter(prog, glCtx.LINK_STATUS)) {
      console.error("Program link error:", glCtx.getProgramInfoLog(prog));
      return;
    }

    glCtx.useProgram(prog);

    const buf = glCtx.createBuffer();
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, buf);
    glCtx.bufferData(
      glCtx.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      glCtx.STATIC_DRAW
    );

    const pos = glCtx.getAttribLocation(prog, "a_position");
    glCtx.enableVertexAttribArray(pos);
    glCtx.vertexAttribPointer(pos, 2, glCtx.FLOAT, false, 0, 0);

    const uTime = glCtx.getUniformLocation(prog, "u_time");
    const uRes = glCtx.getUniformLocation(prog, "u_resolution");
    const uMouse = glCtx.getUniformLocation(prog, "u_mouse");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    function render(t: number) {
      if (!canvas) return;
      if (typeof ResizeObserver === "undefined") syncSize();

      glCtx.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) glCtx.uniform1f(uTime, t * 0.001);
      if (uRes) glCtx.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) glCtx.uniform2f(uMouse, mouse.x, mouse.y);

      glCtx.drawArrays(glCtx.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }

    render(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      glCtx.deleteProgram(prog);
      glCtx.deleteShader(vsShader);
      glCtx.deleteShader(fsShader);
      glCtx.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-30 w-full h-full bg-[#0b1326] pointer-events-none"
      style={{ opacity: 100 }}
    />
  );
}
