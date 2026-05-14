"use client";

import React, { useEffect, useRef } from 'react';
import { Renderer, Geometry, Program, Mesh, Vec2, Color } from 'ogl';

const VERTEX_SHADER = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uBaseColor;
  uniform vec3 uGlowColor;
  uniform float uBreatheSpeed;
  uniform float uSensitivity;
  uniform float uScale;

  varying vec2 vUv;

  // Uilora Micro-Grain Hash
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  // Simplex Noise for organic "Life Patches"
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 a0 = x - floor(x + 0.5);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 uv = vUv;
    
    // 1. Organic Pulse Map
    float patch = snoise(uv * 2.0 + uTime * 0.1);
    float pulse = sin(uTime * uBreatheSpeed + patch * 10.0) * 0.5 + 0.5;

    // 2. Mouse Interaction
    float dist = distance(uv * aspect, uMouse * aspect);
    float awakening = smoothstep(0.5, 0.0, dist);
    
    float interactionPulse = sin(uTime * uBreatheSpeed * 5.0) * 0.5 + 0.5;
    float finalPulse = mix(pulse, interactionPulse, awakening * uSensitivity);

    // 3. Grain Synthesis
    float grain = hash(uv * uScale);
    float visibility = finalPulse * 0.12 + (awakening * 0.15);
    
    // 4. Composition
    vec3 color = uBaseColor;
    
    vec3 grainColor = mix(uBaseColor, uGlowColor, grain * visibility);
    
    vec3 glow = uGlowColor * awakening * finalPulse * 0.2;
    
    vec3 finalColor = grainColor + glow;

    float vignette = smoothstep(1.2, 0.4, length(uv - 0.5));
    finalColor *= vignette;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const UiloraBiolumeGrain = ({
    baseColor = "#020202",
    glowColor = "#ffffff",
    breatheSpeed = 0.8,
    sensitivity = 1.0,
    grainScale = 1024,
}) => {
    const containerRef = useRef(null);
    const mousePos = useRef(new Vec2(0.5, 0.5));
    const targetMousePos = useRef(new Vec2(0.5, 0.5));

    useEffect(() => {
        if (!containerRef.current) return;
        
        let renderer;
        try {
            renderer = new Renderer({ alpha: true, antialias: true });
        } catch (e) {
            console.warn("WebGL not supported, biolume background disabled.");
            return;
        }

        const gl = renderer.gl;
        if (!gl) return;
        
        containerRef.current.appendChild(gl.canvas);

        const geometry = new Geometry(gl, {
            position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
            uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
        });

        const program = new Program(gl, {
            vertex: VERTEX_SHADER,
            fragment: FRAGMENT_SHADER,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: new Vec2() },
                uMouse: { value: mousePos.current },
                uBaseColor: { value: new Color(baseColor) },
                uGlowColor: { value: new Color(glowColor) },
                uBreatheSpeed: { value: breatheSpeed },
                uSensitivity: { value: sensitivity },
                uScale: { value: grainScale },
            },
        });

        const mesh = new Mesh(gl, { geometry, program });

        const resize = () => {
            if (!containerRef.current) return;
            const dpr = Math.min(window.devicePixelRatio, 1.5); // Cap DPR for performance
            renderer.dpr = dpr * 0.75; // Correct property for OGL
            renderer.setSize(window.innerWidth, window.innerHeight);
            program.uniforms.uResolution.value.set(gl.canvas.width, gl.canvas.height);
        };
        window.addEventListener('resize', resize);
        resize();

        const onMouseMove = (e) => {
            targetMousePos.current.set(e.clientX / window.innerWidth, 1.0 - e.clientY / window.innerHeight);
        };
        window.addEventListener('mousemove', onMouseMove);

        let requestId;
        const update = (t) => {
            requestId = requestAnimationFrame(update);
            mousePos.current.lerp(targetMousePos.current, 0.04);
            program.uniforms.uTime.value = t * 0.001;
            renderer.render({ scene: mesh });
        };
        requestId = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(requestId);
            gl.getExtension('WEBGL_lose_context')?.loseContext();
            if (containerRef.current?.contains(gl.canvas)) {
                containerRef.current.removeChild(gl.canvas);
            }
        };
    }, [baseColor, glowColor, breatheSpeed, sensitivity, grainScale]);

    return <div ref={containerRef} className="absolute inset-0 w-full h-full -z-10" />;
};

export default UiloraBiolumeGrain;
