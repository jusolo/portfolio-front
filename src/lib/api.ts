export async function askIA(question: string): Promise<string> {
  const base = import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || "";
  const res = await fetch(`${base}/quest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const detail = data?.detail || `HTTP ${res.status}`;
    throw new Error(`Error consultando IA: ${detail}`);
  }
  const data = await res.json();
  return data?.answer ?? "";
}
