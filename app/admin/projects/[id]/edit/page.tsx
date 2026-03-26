"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";

export default function EditProject() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    checkAuth();
    loadProject();
  }, [params]);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/check");
      if (!res.ok) router.push("/admin");
      else setIsAuthenticated(true);
    } catch {
      router.push("/admin");
    }
  };

  const loadProject = async () => {
    try {
      const res = await fetch(`/api/projects/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setFormData({
          slug: data.slug,
          title: data.title,
          category: data.category || "Rezidențial",
          capacity: data.capacity || "",
          description: data.description,
          location: data.location,
          year: data.year,
          images: data.images?.length ? data.images : [""],
          details: data.details?.length ? data.details : [""],
          specs: data.specs?.length
            ? data.specs
            : [{ label: "", value: "" }],
          gridSize: data.gridSize || "normal",
          featured: data.featured || false,
        });
      }
    } catch (error) {
      console.error("Error loading project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/projects/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          images: formData.images.filter((img: string) => img.trim() !== ""),
          details: formData.details.filter((d: string) => d.trim() !== ""),
          specs: formData.specs.filter(
            (s: { label: string }) => s.label.trim() !== ""
          ),
        }),
      });
      if (res.ok) router.push("/admin/projects");
      else alert("Eroare la salvarea proiectului");
    } catch {
      alert("Eroare la salvarea proiectului");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Image helpers ── */
  const addImage = () =>
    setFormData({ ...formData, images: [...formData.images, ""] });
  const removeImage = (i: number) =>
    setFormData({
      ...formData,
      images: formData.images.filter((_: string, idx: number) => idx !== i),
    });
  const updateImage = (i: number, val: string) => {
    const imgs = [...formData.images];
    imgs[i] = val;
    setFormData({ ...formData, images: imgs });
  };

  /* ── Details helpers ── */
  const addDetail = () =>
    setFormData({ ...formData, details: [...formData.details, ""] });
  const removeDetail = (i: number) =>
    setFormData({
      ...formData,
      details: formData.details.filter((_: string, idx: number) => idx !== i),
    });
  const updateDetail = (i: number, val: string) => {
    const d = [...formData.details];
    d[i] = val;
    setFormData({ ...formData, details: d });
  };

  /* ── Specs helpers ── */
  const addSpec = () =>
    setFormData({
      ...formData,
      specs: [...formData.specs, { label: "", value: "" }],
    });
  const removeSpec = (i: number) =>
    setFormData({
      ...formData,
      specs: formData.specs.filter(
        (_: { label: string; value: string }, idx: number) => idx !== i
      ),
    });
  const updateSpec = (i: number, field: "label" | "value", val: string) => {
    const s = [...formData.specs];
    s[i] = { ...s[i], [field]: val };
    setFormData({ ...formData, specs: s });
  };

  if (loading || !isAuthenticated || !formData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Se încarcă...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/admin/projects"
                className="text-gray-500 hover:text-gray-700"
              >
                ← Înapoi la proiecte
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Editează Proiect
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ── Basic info ── */}
            <div className="bg-white shadow rounded-lg px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Informații generale
              </h3>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Slug
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Titlu
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Categorie
                  </label>
                  <select
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="Rezidențial">Rezidențial</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Capacitate (ex: 20 kW)
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({ ...formData, capacity: e.target.value })
                    }
                  />
                </div>

                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Descriere
                  </label>
                  <textarea
                    required
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Locație
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    An
                  </label>
                  <input
                    type="number"
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        year: parseInt(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Grid Size
                  </label>
                  <select
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    value={formData.gridSize}
                    onChange={(e) =>
                      setFormData({ ...formData, gridSize: e.target.value })
                    }
                  >
                    <option value="normal">Normal</option>
                    <option value="tall">Tall (înalt)</option>
                    <option value="wide">Wide (lat)</option>
                    <option value="large">Large (mare)</option>
                  </select>
                </div>

                <div className="col-span-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Proiect featured
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* ── Images ── */}
            <div className="bg-white shadow rounded-lg px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Imagini</h3>
                <button
                  type="button"
                  onClick={addImage}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  + Adaugă imagine
                </button>
              </div>
              {formData.images.map((image: string, index: number) => (
                <div key={index} className="mb-3">
                  <div className="flex gap-2 items-start">
                    <div className="flex-1">
                      <ImageUpload
                        label={`Imagine ${index + 1}`}
                        value={image}
                        onChange={(url) => updateImage(index, url)}
                      />
                    </div>
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="mt-6 px-3 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50"
                      >
                        Șterge
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Details (Ce am realizat) ── */}
            <div className="bg-white shadow rounded-lg px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Ce am realizat
                </h3>
                <button
                  type="button"
                  onClick={addDetail}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  + Adaugă detaliu
                </button>
              </div>
              {formData.details.map((detail: string, index: number) => (
                <div key={index} className="flex gap-2 items-center mb-3">
                  <input
                    type="text"
                    className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="ex: 36 panouri monocristaline 550W pe acoperiș metalic"
                    value={detail}
                    onChange={(e) => updateDetail(index, e.target.value)}
                  />
                  {formData.details.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDetail(index)}
                      className="px-3 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* ── Specs (Specificații tehnice) ── */}
            <div className="bg-white shadow rounded-lg px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Specificații tehnice
                </h3>
                <button
                  type="button"
                  onClick={addSpec}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  + Adaugă specificație
                </button>
              </div>
              {formData.specs.map(
                (
                  spec: { label: string; value: string },
                  index: number
                ) => (
                  <div key={index} className="flex gap-2 items-center mb-3">
                    <input
                      type="text"
                      className="w-1/3 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="Label (ex: Putere instalată)"
                      value={spec.label}
                      onChange={(e) =>
                        updateSpec(index, "label", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="Valoare (ex: 20 kW)"
                      value={spec.value}
                      onChange={(e) =>
                        updateSpec(index, "value", e.target.value)
                      }
                    />
                    {formData.specs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSpec(index)}
                        className="px-3 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                )
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                {submitting ? "Se salvează..." : "Salvează proiect"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
