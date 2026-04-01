'use client'

import { useRef, useEffect, useCallback } from 'react'

interface FluidBackgroundProps {
  className?: string
}

export default function FluidBackground({ className = '' }: FluidBackgroundProps) {
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
      uniform vec2 u_mouse;

      // Ashima 3D Simplex Noise
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
        float t = u_time * 0.25; // Slow flow

        // Multi-layered noise for organic liquid movement
        float h = snoise(vec3(uv * 2.0, t)) * 0.6
                + snoise(vec3(uv * 4.0, t * 0.8)) * 0.3
                + snoise(vec3(uv * 8.0, t * 0.5)) * 0.1;

        // Mouse ripple (gentle, smooth decay)
        vec2 mouseN = u_mouse / u_resolution;
        float dist = distance(uv, mouseN);
        float ripple = sin(dist * 25.0 - u_time * 2.0) * exp(-dist * dist * 30.0) * 0.2;
        h += ripple;

        // Compute normal via finite differences
        float eps = 0.002;
        float hx1 = snoise(vec3((uv.x + eps) * 2.0, uv.y * 2.0, t)) * 0.6
                   + snoise(vec3((uv.x + eps) * 4.0, uv.y * 4.0, t * 0.8)) * 0.3;
        float hx0 = snoise(vec3((uv.x - eps) * 2.0, uv.y * 2.0, t)) * 0.6
                   + snoise(vec3((uv.x - eps) * 4.0, uv.y * 4.0, t * 0.8)) * 0.3;
        float hy1 = snoise(vec3(uv.x * 2.0, (uv.y + eps) * 2.0, t)) * 0.6
                   + snoise(vec3(uv.x * 4.0, (uv.y + eps) * 4.0, t * 0.8)) * 0.3;
        float hy0 = snoise(vec3(uv.x * 2.0, (uv.y - eps) * 2.0, t)) * 0.6
                   + snoise(vec3(uv.x * 4.0, (uv.y - eps) * 4.0, t * 0.8)) * 0.3;
        vec3 N = normalize(vec3(-(hx1 - hx0), -(hy1 - hy0), 1.0));

        // Blinn-Phong lighting for metallic reflection
        vec3 L = normalize(vec3(0.6, 0.8, 0.5));
        vec3 V = vec3(0.0, 0.0, 1.0);
        vec3 H = normalize(L + V);
        float diff = max(dot(N, L), 0.0);
        float spec = pow(max(dot(N, H), 0.0), 64.0);

        // Color palette: Silver, Gunmetal, Deep Blue
        vec3 SILVER   = vec3(0.75, 0.75, 0.75);
        vec3 GUNMETAL = vec3(0.1725, 0.2078, 0.2235);
        vec3 DEEPBLUE = vec3(0.102, 0.137, 0.494);

        // 2-3 blend points for minimalism
        float blend = h * 0.5 + 0.5;
        vec3 color = mix(GUNMETAL, SILVER, smoothstep(0.3, 0.7, blend));
        color = mix(color, DEEPBLUE, smoothstep(0.7, 1.0, blend) * 0.4);

        // Apply lighting
        color *= 0.35 + diff * 0.45;
        color += SILVER * spec * 0.8;
        color += DEEPBLUE * 0.08;

        gl_FragColor = vec4(color, 0.75);
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
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse')

    let mouseX = canvas.width * 0.5
    let mouseY = canvas.height * 0.5
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = canvas.height - e.clientY
    }
    canvas.addEventListener('mousemove', handleMouseMove)

    const startTime = Date.now()
    const animate = () => {
      const time = (Date.now() - startTime) / 1000

      gl.uniform1f(timeLocation, time)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform2f(mouseLocation, mouseX, mouseY)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
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
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ background: '#0a0a0a' }}
    />
  )
}
