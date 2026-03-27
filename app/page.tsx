import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Map from "@/components/Map";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Process />
      <Gallery />
      <Contact />
      <Map />
    </>
  );
}
