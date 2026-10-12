export function readingTime(body: string | undefined, lang: 'es' | 'en'): string {
  const words = (body ?? '').replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return lang === 'es' ? `${minutes} min de lectura` : `${minutes} min read`;
}
