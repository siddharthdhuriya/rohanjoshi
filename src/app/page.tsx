import { Hero } from "@/components/Hero";
import { MicDrop } from "@/components/MicDrop";
import { ShowsSection } from "@/components/ShowsSection";
import { VideosSection } from "@/components/VideosSection";
import { AboutSection } from "@/components/AboutSection";
import { PressSection } from "@/components/PressSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-black">
      <Hero />
      <MicDrop />
      <ShowsSection />
      <VideosSection />
      <AboutSection />
      <PressSection />
      <Footer />
    </div>
  );
}
