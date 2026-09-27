"use client";

import { ReactNode } from "react";
import { Unlock } from "@/helpers/unlock";
import { useUnlock } from "@/hooks/useUnlock";

/**
 * Envuelve CUALQUIER sección/componente y lo oculta hasta que se
 * cumpla la condición de "unlock" (fecha o taps).
 *
 * Uso:
 *
 *   <UnlockGate
 *     id="tata-section"
 *     unlock={{ type: "date", at: "2026-09-28T17:00:00Z" }}
 *     title="una sorpresita"
 *     description="se abre mañana a las 12"
 *   >
 *     <TataSection />
 *   </UnlockGate>
 *
 *   <UnlockGate
 *     id="carta-final"
 *     unlock={{ type: "taps", count: 10 }}
 *     title="paciencia..."
 *   >
 *     <LockedLetter />
 *   </UnlockGate>
 *
 * `id` debe ser único por cada uso (se guarda el progreso de taps con ese id).
 */

interface UnlockGateProps {
    id: string;
    unlock: Unlock;
    children: ReactNode;
    title?: string;
    description?: string;
    className?: string;
}

function LockIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="11" width="14" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

function HeartTapIcon({ filled }: { filled: boolean }) {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24">
            <path
                d="M12 20s-7.5-4.6-10-9.3C0.3 7.2 2.1 4 5.4 4c2 0 3.5 1.1 4.6 2.7C11.1 5.1 12.6 4 14.6 4c3.3 0 5.1 3.2 3.4 6.7C20 15.4 12 20 12 20Z"
                fill={filled ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function UnlockGate({
    id,
    unlock,
    children,
    title = "todavía no...",
    description,
    className = "",
}: UnlockGateProps) {
    const { unlocked, hydrated, taps, tap, countdownLabel } = useUnlock(id, unlock);

    // evita el flash de "bloqueado" mientras se lee localStorage
    if (!hydrated) return null;

    if (unlocked) {
        return <div className={className}>{children}</div>;
    }

    return (
        <section className={`relative px-6 py-16 text-center ${className}`}>
            <div className="mx-auto max-w-sm rounded-[28px] border border-periwinkle/15 bg-periwinkle/[0.03] px-6 py-10">
                <div className="flex justify-center text-blush/40 mb-3">
                    <LockIcon />
                </div>
                <p className="font-display italic text-peony/80 text-lg mb-1">{title}</p>
                {description && (
                    <p className="font-body text-blush/45 text-xs mb-4">{description}</p>
                )}

                {unlock.type === "date" && (
                    <p className="font-body text-blush/50 text-sm tabular-nums mt-2">
                        {countdownLabel}
                    </p>
                )}

                {unlock.type === "taps" && (
                    <button
                        onClick={tap}
                        className="mt-3 inline-flex items-center gap-2 text-peony/70 hover:text-peony/95 transition-colors"
                    >
                        <HeartTapIcon filled={taps > 0} />
                        <span className="font-body text-xs">
                            toca el corazón · {taps}/{unlock.count}
                        </span>
                    </button>
                )}
            </div>
        </section>
    );
}