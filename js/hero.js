(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvas = document.getElementById("hero-canvas");
  const globe = document.getElementById("globe");
  let raf = 0;
  let mouse = [0.72, 0.42];

  function fit(el) {
    const rect = el.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));
    if (el.width !== w || el.height !== h) {
      el.width = w;
      el.height = h;
    }
    return { w, h, dpr };
  }

  function startShader() {
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, "attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}");
    gl.compileShader(vs);
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, [
      "precision mediump float;",
      "uniform vec2 u_res;uniform float u_t;uniform vec2 u_mouse;",
      "float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}",
      "float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);vec2 u=f*f*(3.0-2.0*f);",
      "return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),u.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x),u.y);}",
      "void main(){",
      "vec2 uv=gl_FragCoord.xy/u_res;vec2 p=uv*2.0-1.0;p.x*=u_res.x/max(u_res.y,1.0);",
      "vec2 m=u_mouse*2.0-1.0;",
      "float n=noise(p*1.35+u_t*0.055+m*0.12);n+=0.5*noise(p*2.7-u_t*0.08);",
      "vec3 indigo=vec3(0.165,0.102,0.431);vec3 violet=vec3(0.318,0.314,0.969);",
      "vec3 blue=vec3(0.0,0.40,1.0);vec3 cyan=vec3(0.227,0.816,0.902);",
      "vec3 col=mix(indigo,violet,smoothstep(0.12,0.72,n));",
      "col=mix(col,blue,smoothstep(0.42,0.86,n));",
      "col=mix(col,cyan,smoothstep(0.7,1.0,n)*0.5);",
      "float glow=1.0-smoothstep(0.0,0.95,length(p-m*0.3));",
      "col+=glow*0.07;",
      "gl_FragColor=vec4(col,1.0);}"
    ].join(""));
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) return;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uT = gl.getUniformLocation(prog, "u_t");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    gl.useProgram(prog);
    return function draw(t) {
      const { w, h } = fit(canvas);
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uT, t * 0.001);
      gl.uniform2f(uMouse, mouse[0], mouse[1]);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
  }

  function drawGlobe(t) {
    if (!globe) return;
    const ctx = globe.getContext("2d");
    if (!ctx) return;
    const { w, h } = fit(globe);
    ctx.clearRect(0, 0, w, h);
    const cx = w * 0.5;
    const cy = h * 0.5;
    const r = Math.min(w, h) * 0.3;
    const glow = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r * 1.7);
    glow.addColorStop(0, "rgba(58,208,230,0.55)");
    glow.addColorStop(0.42, "rgba(0,102,255,0.18)");
    glow.addColorStop(1, "rgba(0,102,255,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.65, 0, Math.PI * 2);
    ctx.fill();
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = "rgba(255,255,255,0.88)";
    ctx.lineWidth = Math.max(1.2, w * 0.004);
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.45)";
    ctx.lineWidth = Math.max(1, w * 0.0025);
    const rot = t * 0.00035;
    for (let i = 1; i <= 4; i++) {
      const lat = (i / 5 - 0.5) * Math.PI;
      const ry = Math.cos(lat) * r * 0.28 + r * 0.02;
      const y = Math.sin(lat) * r * 0.92;
      ctx.beginPath();
      ctx.ellipse(0, y, r * Math.cos(lat * 0.15), Math.max(2, ry), 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    for (let i = 0; i < 6; i++) {
      const a = rot + (i / 6) * Math.PI;
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.max(1, Math.abs(Math.cos(a)) * r), r, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    for (let i = 0; i < 8; i++) {
      const a = rot * 1.4 + i * 1.3;
      const z = Math.sin(a);
      const x = Math.cos(a) * r * 0.78;
      const y = Math.sin(a * 0.7) * r * 0.55;
      ctx.globalAlpha = 0.35 + (z + 1) * 0.3;
      ctx.beginPath();
      ctx.arc(x, y, Math.max(2, w * 0.008), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  const drawShader = startShader();

  function frame(t) {
    if (drawShader) drawShader(t);
    drawGlobe(t);
    if (!reduce && !document.hidden) raf = requestAnimationFrame(frame);
  }

  function kick() {
    cancelAnimationFrame(raf);
    raf = 0;
    if (reduce) {
      frame(0);
      return;
    }
    raf = requestAnimationFrame(frame);
  }

  window.addEventListener("pointermove", (event) => {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    mouse = [event.clientX / w, 1 - event.clientY / h];
  });
  window.addEventListener("resize", kick);
  document.addEventListener("visibilitychange", kick);
  kick();
})();
