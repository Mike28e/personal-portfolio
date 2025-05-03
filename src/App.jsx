import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">John Doe</h1>
          <nav className="space-x-6 text-lg">
            <a href="#about" className="hover:text-blue-200">About</a>
            <a href="#projects" className="hover:text-blue-200">Projects</a>
            <a href="#contact" className="hover:text-blue-200">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">Hi, I’m John — Web Developer</h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          I build sleek, responsive websites with modern frontend tools. Let's create something great together.
        </p>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-4xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-semibold mb-4">About Me</h3>
        <p className="text-gray-700 leading-relaxed">
          I'm a frontend developer with experience in Vue and React. I specialize in crafting clean UI and delivering engaging user experiences.
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-semibold mb-6">Projects</h3>
          <ul className="space-y-4">
            <li className="bg-white p-4 shadow-sm rounded-md border">
              <h4 className="font-bold">Portfolio Website</h4>
              <p>A personal portfolio built with Vue and Tailwind.</p>
            </li>
            <li className="bg-white p-4 shadow-sm rounded-md border">
              <h4 className="font-bold">Todo App</h4>
              <p>A simple yet functional task manager made with React.</p>
            </li>
          </ul>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-4xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-semibold mb-4">Contact</h3>
        <p className="text-gray-700">Email me at: <a href="mailto:john@example.com" className="text-blue-600 underline">john@example.com</a></p>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-4 mt-12">
        © 2025 John Doe
      </footer>
    </div>
  );
}

export default App;
