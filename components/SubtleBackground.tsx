'use client'

import { useEffect, useRef } from 'react'

export default function SubtleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Aurora gradient blobs - much more visible
    const blobs = [
      { xRatio: 0.15, yRatio: 0.25, radius: 400, freqX: 0.00025, freqY: 0.00018, phaseX: 0, phaseY: 1.2, color: [30, 64, 175], alpha: 0.22 },
      { xRatio: 0.75, yRatio: 0.45, radius: 450, freqX: 0.0002, freqY: 0.00028, phaseX: 1.5, phaseY: 0.8, color: [6, 95, 70], alpha: 0.20 },
      { xRatio: 0.45, yRatio: 0.7, radius: 380, freqX: 0.0003, freqY: 0.00022, phaseX: 3.0, phaseY: 2.0, color: [88, 28, 135], alpha: 0.18 },
      { xRatio: 0.25, yRatio: 0.55, radius: 420, freqX: 0.00018, freqY: 0.00015, phaseX: 4.5, phaseY: 3.5, color: [14, 116, 144], alpha: 0.20 },
      { xRatio: 0.85, yRatio: 0.15, radius: 350, freqX: 0.00022, freqY: 0.0002, phaseX: 2.0, phaseY: 5.0, color: [37, 99, 235], alpha: 0.22 },
      { xRatio: 0.6, yRatio: 0.85, radius: 320, freqX: 0.00028, freqY: 0.00025, phaseX: 0.8, phaseY: 4.2, color: [5, 150, 105], alpha: 0.18 },
      { xRatio: 0.35, yRatio: 0.35, radius: 280, freqX: 0.00032, freqY: 0.00028, phaseX: 5.5, phaseY: 1.8, color: [79, 70, 229], alpha: 0.16 },
    ]

    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const w = canvas.width
      const h = canvas.height

      // Clear with dark base
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, w, h)

      // Screen blend for aurora mixing - creates bright, luminous effect
      ctx.globalCompositeOperation = 'screen'

      for (const blob of blobs) {
        // Smooth sinusoidal drift
        const cx = w * blob.xRatio + Math.sin(elapsed * blob.freqX + blob.phaseX) * w * 0.12
        const cy = h * blob.yRatio + Math.cos(elapsed * blob.freqY + blob.phaseY) * h * 0.10

        // Gentle breathing pulse
        const pulseR = blob.radius * (1 + Math.sin(elapsed * 0.00008 + blob.phaseX) * 0.15)

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulseR)
        const [r, g, b] = blob.color
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${blob.alpha})`)
        gradient.addColorStop(0.35, `rgba(${r}, ${g}, ${b}, ${blob.alpha * 0.6})`)
        gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${blob.alpha * 0.2})`)
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

        ctx.fillStyle = gradient
        ctx.fillRect(cx - pulseR, cy - pulseR, pulseR * 2, pulseR * 2)
      }

      ctx.globalCompositeOperation = 'source-over'

      animRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: '#0a0a0a' }}
    />
  )
}
