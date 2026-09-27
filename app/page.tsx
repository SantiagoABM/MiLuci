import Collage from "@/components/Collage";
import Counter from "@/components/Counter";
import Calendar from "@/components/Calendar";
import LockedLetter from "@/components/LockedLetter";
// import AudioPlayer from "@/components/AudioPlayer";
import { ACTUAL_MONTHS, COUPLE_NAMES } from "@/lib/config";
import TataSection from "@/components/TataSection";
import SpotifySong from "@/components/SpotifySong";
import UnlockGate from "@/components/common/UnlockGate";
import YellowFlowers from "@/components/YellowFlowers";

export default function Home() {
  return (
    <main className="relative">
      <Collage />
      <Counter />
      <Calendar />
      <TataSection />
      <UnlockGate id="ramito" unlock={{ type: "taps", count: 21 }} title="flores?">
        <YellowFlowers />
      </UnlockGate>
      <UnlockGate
        id="tata-section"          // único por cada uso, así no se cruzan los taps guardados
        unlock={{ type: "date", at: "2026-09-28T07:00:00Z" }} // mañana 12pm Perú
        title="una sorpresita"
        description="se abre mañana <3"
      >
      <LockedLetter />
      </UnlockGate>
      <UnlockGate id="spotify-songs" unlock={{ type: "taps", count: 83 }} title="paciencia...">
      <SpotifySong />
      </UnlockGate>
      <footer className="py-14 px-6 text-center border-t border-periwinkle/15">
        <p className="font-display italic text-peony/90 text-lg">{COUPLE_NAMES}</p>
        <p className="font-body text-blush/50 text-xs mt-2 tracking-wide">
          hecho para ti, {ACTUAL_MONTHS} mesesotes de amor puro
        </p>
      </footer>

      {/* <AudioPlayer /> */}
    </main>
  );
}
