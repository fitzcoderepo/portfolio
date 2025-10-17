import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Project";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";


export default function Home() {
  return (

    <>
      <Hero />
      <About />
      <Projects />
      <Contact />

    </>


  );
}
