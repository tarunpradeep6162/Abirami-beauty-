export async function loadStructuredData() {
  const path = document.body.dataset.schema;
  if (!path || !/^\/data\/schema\/[a-z0-9.-]+\.json$/.test(path)) return;
  try {
    const response = await fetch(path, { credentials: 'same-origin' });
    if (!response.ok) return;
    const data = await response.json();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
    document.head.append(script);
  } catch { /* The static page remains readable if structured data cannot load. */ }
}
