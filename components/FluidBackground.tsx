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

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        vec2 mouse = u_mouse / u_resolution;
        
        float n = sin(uv.x * 10.0 + u_time) * cos(uv.y * 10.0 + u_time * 0.5) * 0.5 + 0.5;
        
        float dist = distance(uv, mouse);
        float ripple = sin(dist * 30.0 - u_time * 3.0) * 0.1 * smoothstep(0.5, 0.0, dist);
        n += ripple;
        
        vec3 color1 = vec3(0.231, 0.510, 0.965);
        vec3 color2 = vec3(0.545, 0.361, 0.965);
        vec3 color3 = vec3(0.024, 0.714, 0.831);
        
        vec3 color = mix(color1, color2, uv.x);
        color = mix(color, color3, uv.y * 0.5);
        
        color *= 0.3 + n * 0.2;
        
        gl_FragColor = vec4(color, 0.8);
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

    let mouseX = 0
    let mouseY = 0
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
