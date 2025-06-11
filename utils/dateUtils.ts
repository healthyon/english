
export function getCurrentDateISO(): string {
  return new Date().toISOString().split('T')[0];
}

export function formatDate(dateString: string, locale: string = 'ko-KR'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatMonth(dateString: string, locale: string = 'ko-KR'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
  });
}
