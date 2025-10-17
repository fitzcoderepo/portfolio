'use client' // directive used to indicate that the file should be treated as a client-side component. This is telling Next.js that this component must be rendered in the browser, not on the server.

export function Hero() {
  return (
    <section id="top" className="min-h-[100vh] flex flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-8xl md:text-8xl font-bold tracking-tight">Hello, world.</h1>
      <br />
      <h4 className="text-lg md:text-lg font-semibold mt-4 text-gray-500">
        I'm a software developer who builds backend systems and the UIs they power.
      </h4>
      <p className="mt-4 max-w-4xl text-lg text-gray-500">
        
      </p>
      <div className="mt-8 flex gap-3">
        <a href="#about" className="rounded-xl px-6 py-3 border border-gray-300 hover:bg-gray-50">About me</a>
        <a href="#projects" className="rounded-xl px-6 py-3 border border-gray-300 hover:bg-gray-50">See projects</a>
        <a href="#contact" className="rounded-xl px-6 py-3 border border-gray-300 hover:bg-gray-50">Contact</a>
      </div>
    </section>
  )
}