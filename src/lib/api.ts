const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function askIA(question: string): Promise<string> {
  const res = await fetch(`${API_URL}/chat/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const detail = data?.message || `HTTP ${res.status}`;
    throw new Error(`Error consultando IA: ${detail}`);
  }
  const data = await res.json();
  return data?.answer ?? "";
}

// export async function getProjects() {
//   const res = await fetch(`${API_URL}/project`);
//   if (!res.ok) throw new Error(`Error fetching projects: ${res.status}`);
//   return res.json();
// }

// export async function getSkills() {
//   const res = await fetch(`${API_URL}/skill`);
//   if (!res.ok) throw new Error(`Error fetching skills: ${res.status}`);
//   return res.json();
// }

// export async function getExperiences() {
//   const res = await fetch(`${API_URL}/experience`);
//   if (!res.ok) throw new Error(`Error fetching experiences: ${res.status}`);
//   return res.json();
// }

// export async function getEducation() {
//   const res = await fetch(`${API_URL}/education`);
//   if (!res.ok) throw new Error(`Error fetching education: ${res.status}`);
//   return res.json();
// }
