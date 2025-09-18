"use client";

import { useEffect, useMemo, useState } from "react";
import { listItems, createItem, deleteItem } from "@/lib/api";
import styles from "./styles.module.css";

export default function ProjectsPage() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await listItems();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  // lightweight client-side validation
  const isValid = useMemo(() => {
    if (!title.trim()) return false;
    if (url && !/^https?:\/\//i.test(url)) return false;
    if (!desc.trim()) return false;
    return true;
  }, [title, url, desc]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (!isValid) { setError("Please fill Title & Description (URL optional, must start with http/https)."); return; }
    setSubmitting(true);
    try {
      await createItem({ title, url, description: desc });
      setTitle(""); setUrl(""); setDesc("");
      await load();
    } catch (e) {
      setError(e.message || "Could not create project");
    } finally {
      setSubmitting(false);
    }
  }

  async function onDelete(id) {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteItem(id);
      await load();
    } catch (e) {
      alert(e.message || "Delete failed");
    }
  }

  return (
    <main className={styles.wrap}>
      <h1>Projects</h1>

      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.row}>
          <label>Title</label>
          <input
            value={title}
            onChange={e=>setTitle(e.target.value)}
            placeholder="e.g., Portfolio v1"
            required
          />
        </div>
        <div className={styles.row}>
          <label>URL (optional)</label>
          <input
            value={url}
            onChange={e=>setUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </div>
        <div className={styles.row}>
          <label>Description</label>
          <textarea
            value={desc}
            onChange={e=>setDesc(e.target.value)}
            placeholder="Short description…"
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.wrap} disabled={!isValid || submitting}>{submitting ? "Adding…" : "Add project"}</button>
      </form>

      <section className={styles.tableWrap}>
        {loading ? <p>Loading…</p> :
          items.length === 0 ? <p className={styles.empty}>No projects yet.</p> :
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>URL</th>
                <th>Description</th>
                <th style={{width: 1}}></th>
              </tr>
            </thead>
            <tbody>
              {items.map(p => (
                <tr key={p.id || `${p.title}-${p.createdAt || Math.random()}`}>
                  <td><strong>{p.title}</strong></td>
                  <td>{p.url ? <a href={p.url} target="_blank" rel="noreferrer">link</a> : <em>—</em>}</td>
                  <td>{p.description}</td>
                  <td><button className={styles.danger} onClick={()=>onDelete(p.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </sec