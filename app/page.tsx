import Collage from "@/components/Collage";
import Counter from "@/components/Counter";
import Calendar from "@/components/Calendar";
import LockedLetter from "@/components/LockedLetter";
import AudioPlayer from "@/components/AudioPlayer";
import { COUPLE_NAMES } from "@/lib/config";
import TataSection from "@/components/TataSection";

export default function Home() {
  return (
    <main className="relative">
      <Collage />
      <Counter />
      <Calendar />
      <TataSection />
      <LockedLetter />

      <footer className="py-14 px-6 text-center border-t border-periwinkle/15">
        <p className="font-display italic text-peony/90 text-lg">{COUPLE_NAMES}</p>
        <p className="font-body text-blush/50 text-xs mt-2 tracking-wide">
          hecho para ti, 28 mesesotes de amor puro
        </p>
      </footer>

      <AudioPlayer />
    </main>
  );
}
