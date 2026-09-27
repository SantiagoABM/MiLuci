/**
 * Cálculo de tiempo transcurrido desde una fecha fija (ej. el día que
 * empezaron). Cuenta meses de calendario reales, no "30 días = 1 mes".
 */

/**
 * Cantidad de meses completos transcurridos desde `startDate` hasta `now`.
 * Ej: si empezaron el 15 de enero y hoy es 10 de marzo, da 1 (no 2),
 * porque el mes de febrero-a-marzo todavía no se completó (10 < 15).
 */
export function monthsSince(startDate: string | Date, now: Date = new Date()): number {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;

  let months =
    (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());

  // si todavía no llega el "día aniversario" del mes, no se completó el mes actual
  if (now.getDate() < start.getDate()) {
    months -= 1;
  }

  return Math.max(0, months);
}

export interface ElapsedBreakdown {
  years: number;
  months: number; // meses sueltos, ya sin contar los años (0-11)
  days: number; // días sueltos, ya sin contar meses/años
  totalMonths: number; // meses completos totales (lo que da monthsSince)
  totalDays: number; // días completos totales desde el inicio
}

/**
 * Desglose completo (años, meses, días) desde `startDate` hasta `now`,
 * más los totales en meses y en días — útil para mostrar
 * "1 año, 4 meses, 12 días" o "28 meses" según lo que quieras mostrar.
 */
export function elapsedBreakdown(
  startDate: string | Date,
  now: Date = new Date()
): ElapsedBreakdown {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;

  const totalMonths = monthsSince(start, now);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  // días sueltos: cuenta desde el último "aniversario mensual" hasta hoy
  const lastAnniversary = new Date(start);
  lastAnniversary.setMonth(lastAnniversary.getMonth() + totalMonths);
  const days = Math.floor((now.getTime() - lastAnniversary.getTime()) / 86_400_000);

  const totalDays = Math.floor((now.getTime() - start.getTime()) / 86_400_000);

  return { years, months, days, totalMonths, totalDays };
}