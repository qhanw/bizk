export function parents(el?: any, selector?: string) {
  const parents = [];
  while ((el = el?.parentNode) && el !== document) {
    if (!selector || el?.matches(selector)) {
      parents.push(el);
    }
  }

  return parents;
}

export function cssToObj(str: string) {
  return str.split(';').reduce((prev, curr) => {
    if (curr) {
      const [key, val] = curr?.split(':');
      prev[key.trim()] = val.trim();
    }

    return prev;
  }, {});
}

export function objToCss(obj: Record<string, string>) {
  return Object.entries(obj)
    .map((c) => c.join(':'))
    .join(';');
}

export function limit(
  width: number,
  { min, max, offset }: { min: number; max: number; offset: number },
) {
  const w = width + offset;

  if (w < min) return { width: min, offset: min - width };

  if (w > max) return { width: max, offset: max - width };

  return { width: w, offset };
}
