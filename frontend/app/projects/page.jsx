"use client";

import { useEffect, useMemo, useState } from "react";
import { listItems, createItem, deleteItem } from "../../lib/api"; 
import styles from "./styles.module.css";

export default function ProjectsPage() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [course, setCourse] = useState("");
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

  useEffect(() => {
    load();
  }, []);

  const isValid = useMemo(() => {
    if (!name.trim()) return false;
    if (!date.trim()) return false;
    if (!course.trim()) return false;
    if (!desc.trim()) return false;
    return true;
  }, [name, date, course, desc]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (!isValid) {
      setError("All fields are required.");
      return;
    }
    setSubmitting(true);
    try {
      await createItem({ name, date, course, description: desc });
      setName(""); setDate(""); setCourse(""); setDesc("");
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
      <h1 className={styles.title}>Projects</h1>

      <section className={styles.tableWrap}>
        {loading ? (
          <p>Loading…</p>
        ) : items.length === 0 ? (
          <p className={styles.empty}>No projects yet.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Course</th>
                <th>Description</th>
                <th style={{ width: 1 }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id || `${p.name}-${p.createdAt || Math.random()}`}>
                  <td><strong>{p.name}</strong></td>
                  <td>{p.date}</td>
                  <td>{p.course}</td>
                  <td>{p.description}</td>
                  <td>
                    {p.id && (
                      <button className={`${styles.button} ${styles.danger}`}
                          onClick={() => onDelete(p.id)}>
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.row}>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ex Project 1"
            required
          />
        </div>
        <div className={styles.row}>
          <label>Date</label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="january 1, 2000"
            required
          />
        </div>
        <div className={styles.row}>
          <label>Course</label>
          <input
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="course name/number"
            required
          />
        </div>
        <div className={styles.row}>
          <label>Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Short description…"
            required
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.button} disabled={!isValid || submitting}>
          {submitting ? "Adding…" : "Add project"}
        </button>
      </form>
    </main>
  );
}
