const BASE = process.env.API_BASE;
const RES  = process.env.API_RESOURCE;

export async function listItems() {
    const res = await fetch(`${BASE}/${RES}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to list");
    return res.json();
}


export async function createItem(payload) {
    const res = await fetch(`${BASE}/${RES}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Failed to create");
    }
    return res.json(); // ideally returns { id, ok }
}


export async function deleteItem(id) {
    const res = await fetch(`${BASE}/${RES}/${id}`, { method: "DELETE" });
    if (!res.ok && res.status !== 204) throw new Error("Failed to delete");
}