const BASE = "http://localhost:8080";
const RES  = "projects";

export const _DEBUG_MARK = "api.js >>> HARD-CODED BASE/RES <<<";
console.log("[api DEBUG] I am the edited api.js file");

console.log("API base:", BASE);
console.log("API resource:", RES);
console.log("Full URL example:", `${BASE}/${RES}`);


export async function listItems() {
    const res = await fetch("http://localhost:8080/projects", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to list");
    return res.json();
}


export async function createItem(payload) {
    const res = await fetch("http://localhost:8080/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Failed to create");
    }
    return res.json();
}

export async function deleteItem(id) {
    const res = await fetch(`http://localhost:8080/projects/${id}`, { method: "DELETE" });
    if (!res.ok && res.status !== 204) throw new Error("Failed to delete");
}