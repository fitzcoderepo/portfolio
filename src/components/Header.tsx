import { Mail, GitHub, Linkedin } from "react-feather";
import Link from "next/link";

export default function Header() {
    return (
        <header className="fixed inset-x-0 top-0 z-50 h-18 p-3 backdrop-blur-xl ">
            <nav className=" mx-3 mt-1 flex justify-between text-sm text-gray-700">
                <a href="#top" className="mt-2 mx-3 text-lg font-bold">Alec Fitzgerald</a>

                <div className="flex gap-6 mt-2 mx-3 text-lg">
                    <a href="#about" className="inline-flex items-center p-2">About me</a>
                    <a href="#projects" className="inline-flex items-center p-2">See projects</a>
                    <a href="#contact" className="inline-flex items-center p-2">Contact</a>
                </div>

                <div className="flex gap-3 mt-2 mx-3">

                    <a href="mailto:alecfitzgerald90@gmail.com" className="inline-flex items-center p-2 text-gray-400">
                        <Mail className="h-7 w-7" strokeWidth={1.5} aria-hidden />
                        <span className="sr-only">Email</span>
                    </a>

                    <a href="https://github.com/yourname" target="_blank" rel="noopener noreferrer" className="inline-flex items-center p-2 text-purple-900">
                        <GitHub className="h-7 w-7" strokeWidth={1.5} aria-hidden />
                        <span className="sr-only">GitHub</span>
                    </a>

                    <a href="https://www.linkedin.com/in/yourname" target="_blank" rel="noopener noreferrer" className="inline-flex items-center p-2 text-sky-700">
                        <Linkedin className="h-7 w-7" strokeWidth={1.5} aria-hidden />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                </div>
            </nav>
        </header>
    );
}
