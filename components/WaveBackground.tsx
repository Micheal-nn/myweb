'use client'

import { useRef, useEffect, useCallback } from 'react'

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) {
      console.warn('WebGL not supported')
      return
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    const fragmentShaderSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;

      // Ashima 3D Simplex Noise (same proven foundation as FluidBackground)
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);

        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);

        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;

        i = mod289(i);
        vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

        float n_ = 0.142857142857;
        vec3  ns = n_ * D.wyz - D.xzx;

        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );

        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);

        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);

        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 105.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        float t = u_time * 0.15; // Very slow — deep ocean calm

        // === Multi-layer noise: deep water volume ===
        float h = snoise(vec3(uv * 1.5, t)) * 0.5
                + snoise(vec3(uv * 3.0, t * 0.7)) * 0.3
                + snoise(vec3(uv * 6.0, t * 0.4)) * 0.15
                + snoise(vec3(uv * 12.0, t * 0.2)) * 0.05;

        // === Light caustics: higher-frequency noise for light pattern ===
        float caustic = snoise(vec3(uv * 4.0 + t * 0.3, t * 0.5)) * 0.5
                      + snoise(vec3(uv * 8.0 + t * 0.2, t * 0.3)) * 0.3
                      + snoise(vec3(uv * 16.0 + t * 0.1, t * 0.15)) * 0.2;
        caustic = pow(max(caustic, 0.0), 2.0) * 0.6; // Sharp bright spots, natural decay

        // === God rays: vertical light shafts ===
        float ray1 = smoothstep(0.6, 1.0, sin(uv.x * 3.14159 + t * 0.4 + snoise(vec3(uv.y * 2.0, t * 0.2, 0.0)) * 1.5));
        float ray2 = smoothstep(0.65, 1.0, sin(uv.x * 5.0 - t * 0.3 + snoise(vec3(uv.y * 3.0, t * 0.15, 1.0)) * 2.0));
        float ray3 = smoothstep(0.7, 1.0, sin(uv.x * 7.0 + t * 0.5 + snoise(vec3(uv.y * 1.5, t * 0.1, 2.0)) * 1.8));
        float rays = (ray1 * 0.5 + ray2 * 0.3 + ray3 * 0.2) * (1.0 - uv.y * 0.6); // Fade downward

        // === Compute surface normal for light refraction ===
        float eps = 0.003;
        float hx1 = snoise(vec3((uv.x + eps) * 1.5, uv.y * 1.5, t)) * 0.5
                   + snoise(vec3((uv.x + eps) * 3.0, uv.y * 3.0, t * 0.7)) * 0.3;
        float hx0 = snoise(vec3((uv.x - eps) * 1.5, uv.y * 1.5, t)) * 0.5
                   + snoise(vec3((uv.x - eps) * 3.0, uv.y * 3.0, t * 0.7)) * 0.3;
        float hy1 = snoise(vec3(uv.x * 1.5, (uv.y + eps) * 1.5, t)) * 0.5
                   + snoise(vec3(uv.x * 3.0, (uv.y + eps) * 3.0, t * 0.7)) * 0.3;
        float hy0 = snoise(vec3(uv.x * 1.5, (uv.y - eps) * 1.5, t)) * 0.5
                   + snoise(vec3(uv.x * 3.0, (uv.y - eps) * 3.0, t * 0.7)) * 0.3;
        vec3 N = normalize(vec3(-(hx1 - hx0), -(hy1 - hy0), 1.0));

        // === Deep ocean color palette ===
        vec3 ABYSS      = vec3(0.015, 0.025, 0.05);   // Near-black deep blue
        vec3 DEEP_BLUE   = vec3(0.04, 0.08, 0.16);    // Dark navy
        vec3 DEEP_CYAN   = vec3(0.03, 0.14, 0.18);    // Muted teal
        vec3 MUTED_AQUA  = vec3(0.04, 0.16, 0.14);    // Dark aqua
        vec3 GUNMETAL    = vec3(0.08, 0.09, 0.11);    // Cool dark gray

        // === Base color: smooth blend through the deep palette ===
        float blend = h * 0.5 + 0.5;
        vec3 color = mix(ABYSS, DEEP_BLUE, smoothstep(0.2, 0.5, blend));
        color = mix(color, DEEP_CYAN, smoothstep(0.5, 0.75, blend));
        color = mix(color, MUTED_AQUA, smoothstep(0.75, 1.0, blend) * 0.5);
        color = mix(color, GUNMETAL, smoothstep(0.0, 0.2, 1.0 - blend) * 0.3);

        // === Light scattering: soft diffused from above-left ===
        vec3 lightDir = normalize(vec3(-0.3, 0.8, 0.5));
        float diff = max(dot(N, lightDir), 0.0);
        color += DEEP_CYAN * diff * 0.12; // Very subtle — underwater scatter

        // === Specular: faint light caustic shimmer ===
        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        vec3 halfDir = normalize(lightDir + viewDir);
        float spec = pow(max(dot(N, halfDir), 0.0), 32.0);
        color += MUTED_AQUA * spec * 0.15;

        // === Add caustic light patterns ===
        color += DEEP_CYAN * caustic * 0.08;

        // === Add god rays ===
        color += vec3(0.05, 0.12, 0.15) * rays * 0.12;

        // === Depth fog: slightly darker toward bottom ===
        color *= 1.0 - uv.y * 0.15;

        // === Natural light decay: no harsh edges ===
        color *= 0.8 + 0.2 * (1.0 - length(uv - vec2(0.5)) * 0.5);

        gl_FragColor = vec4(color, 1.0);
      }
    `

    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type)
      gl.shaderSource(shader!, source)
      gl.compileShader(shader!)
      if (!gl.getShaderParameter(shader!, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader!))
        return null
      }
      return shader
    }

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER)

    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()!
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    gl.useProgram(program)

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const timeLocation = gl.getUniformLocation(program, 'u_time')
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')

    const startTime = Date.now()
    const animate = () => {
      const time = (Date.now() - startTime) / 1000

      gl.uniform1f(timeLocation, time)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  useEffect(() => {
    const cleanup = initWebGL()
    return cleanup
  }, [initWebGL])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: '#040810' }}
    />
  )
}
