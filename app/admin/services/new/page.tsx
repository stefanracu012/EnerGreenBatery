"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";

interface PackageProduct {
  name: string;
  spec: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
}

interface Package {
  name: string;
  kw: number;
  price: number;
  popular: boolean;
  description: string;
  products: PackageProduct[];
  installationPrice: number;
}

const emptyProduct: PackageProduct = {
  name: "",
  spec: "",
  quantity: 0,
  unit: "buc",
  unitPrice: 0,
  totalPrice: 0,
};

const emptyPackage: Package = {
  name: "",
  kw: 0,
  price: 0,
  popular: false,
  description: "",
  products: [{ ...emptyProduct }],
  installationPrice: 0,
};

export default function NewService() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    description: "",
    image: "",
  });
  const [packages, setPackages] = useState<Package[]>([
    { ...emptyPackage, products: [{ ...emptyProduct }] },
  ]);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/check");
      if (!res.ok) {
        router.push("/admin");
      } else {
        setIsAuthenticated(true);
      }
    } catch {
      router.push("/admin");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          packages: packages
            .filter((p) => p.name.trim() !== "")
            .map((p) => ({
              ...p,
              products: p.products.filter((pr) => pr.name.trim() !== ""),
            })),
        }),
      });

      if (res.ok) {
        router.push("/admin/services");
      } else {
        alert("Eroare la salvarea serviciului");
      }
    } catch {
      alert("Eroare la salvarea serviciului");
    } finally {
      setLoading(false);
    }
  };

  /* ── Package helpers ── */
  const addPackage = () => {
    setPackages([
      ...packages,
      { ...emptyPackage, products: [{ ...emptyProduct }] },
    ]);
  };

  const updatePackage = (
    index: number,
    field: keyof Package,
    value: unknown,
  ) => {
    const next = [...packages];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    next[index] = { ...next[index], [field]: value } as any;
    setPackages(next);
  };

  const removePackage = (index: number) => {
    setPackages(packages.filter((_, i) => i !== index));
  };

  /* ── Product helpers ── */
  const addProduct = (pkgIdx: number) => {
    const next = [...packages];
    next[pkgIdx].products = [...next[pkgIdx].products, { ...emptyProduct }];
    setPackages(next);
  };

  const updateProduct = (
    pkgIdx: number,
    pIdx: number,
    field: keyof PackageProduct,
    value: unknown,
  ) => {
    const next = [...packages];
    const product = { ...next[pkgIdx].products[pIdx], [field]: value };

    // Auto-compute totalPrice when quantity or unitPrice changes
    if (field === "quantity" || field === "unitPrice") {
      product.totalPrice =
        Math.round(product.quantity * product.unitPrice * 100) / 100;
    }

    next[pkgIdx].products = next[pkgIdx].products.map((p, i) =>
      i === pIdx ? product : p,
    );
    setPackages(next);
  };

  const removeProduct = (pkgIdx: number, pIdx: number) => {
    const next = [...packages];
    next[pkgIdx].products = next[pkgIdx].products.filter((_, i) => i !== pIdx);
    setPackages(next);
  };

  if (!isAuthenticated) {
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
                href="/admin/services"
                className="text-gray-500 hover:text-gray-700"
              >
                ← Înapoi la servicii
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Adaugă Serviciu Nou
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ── Detalii Serviciu ── */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              Detalii Serviciu
            </h2>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  required
                  pattern="[a-z0-9]+(-[a-z0-9]+)*"
                  title="Doar litere mici, cifre și cratime (ex: rezidential)"
                  className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slug: e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9-]/g, ""),
                    })
                  }
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titlu
                </label>
                <input
                  type="text"
                  required
                  className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const autoSlug = title
                      .trim()
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-+|-+$/g, "");
                    setFormData({ ...formData, title, slug: autoSlug });
                  }}
                />
              </div>

              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descriere
                </label>
                <textarea
                  required
                  rows={3}
                  className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <ImageUpload
                  label="Imagine serviciu (opțional)"
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                />
              </div>
            </div>
          </div>

          {/* ── Pachete ── */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Pachete</h2>
              <button
                type="button"
                onClick={addPackage}
                className="px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                + Adaugă pachet
              </button>
            </div>

            <div className="space-y-8">
              {packages.map((pkg, pkgIdx) => (
                <div
                  key={pkgIdx}
                  className="border-2 border-gray-200 rounded-lg overflow-hidden"
                >
                  {/* Package header */}
                  <div className="bg-gray-50 px-5 py-3 flex justify-between items-center border-b border-gray-200">
                    <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                      Pachet {pkgIdx + 1}
                      {pkg.name ? ` — ${pkg.name}` : ""}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removePackage(pkgIdx)}
                      className="px-3 py-1 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50"
                    >
                      Șterge pachet
                    </button>
                  </div>

                  <div className="p-3 sm:p-5 space-y-5">
                    {/* Basic fields */}
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nume
                        </label>
                        <input
                          type="text"
                          required
                          className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          value={pkg.name}
                          onChange={(e) =>
                            updatePackage(pkgIdx, "name", e.target.value)
                          }
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          KW
                        </label>
                        <input
                          type="number"
                          required
                          className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          value={pkg.kw}
                          onChange={(e) =>
                            updatePackage(
                              pkgIdx,
                              "kw",
                              parseFloat(e.target.value) || 0,
                            )
                          }
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Echipamente (€)
                        </label>
                        <input
                          type="number"
                          required
                          className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          value={pkg.price}
                          onChange={(e) =>
                            updatePackage(
                              pkgIdx,
                              "price",
                              parseFloat(e.target.value) || 0,
                            )
                          }
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Instalare (€)
                        </label>
                        <input
                          type="number"
                          className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          value={pkg.installationPrice}
                          onChange={(e) =>
                            updatePackage(
                              pkgIdx,
                              "installationPrice",
                              parseFloat(e.target.value) || 0,
                            )
                          }
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Total pachet (€)
                        </label>
                        <div className="block w-full bg-green-50 border border-green-200 rounded-md px-3 py-2 sm:text-sm font-bold text-green-700">
                          {(pkg.price + pkg.installationPrice).toLocaleString(
                            "ro-RO",
                          )}{" "}
                          €
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descriere
                      </label>
                      <input
                        type="text"
                        className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        value={pkg.description}
                        onChange={(e) =>
                          updatePackage(pkgIdx, "description", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                          checked={pkg.popular}
                          onChange={(e) =>
                            updatePackage(pkgIdx, "popular", e.target.checked)
                          }
                        />
                        <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                          <svg
                            className="w-4 h-4 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          Pachet popular
                        </span>
                      </label>
                    </div>

                    {/* ── Produse ── */}
                    <div className="border-t border-gray-200 pt-5">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wide flex items-center gap-1.5">
                          <svg
                            className="w-4 h-4 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                            />
                          </svg>
                          Produse
                        </h4>
                        <button
                          type="button"
                          onClick={() => addProduct(pkgIdx)}
                          className="px-4 py-2 text-sm font-medium rounded-md text-green-700 border border-green-300 hover:bg-green-50"
                        >
                          + Adaugă produs
                        </button>
                      </div>

                      <div className="space-y-3">
                        {pkg.products.map((prod, pIdx) => (
                          <div
                            key={pIdx}
                            className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4"
                          >
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-xs font-bold text-gray-400 uppercase">
                                Produs {pIdx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeProduct(pkgIdx, pIdx)}
                                className="px-2.5 py-1.5 text-xs font-medium rounded text-red-600 border border-red-200 hover:bg-red-50"
                                title="Șterge produs"
                              >
                                ✕ Șterge
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                  Produs
                                </label>
                                <input
                                  type="text"
                                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-base sm:text-sm sm:py-2 focus:ring-green-500 focus:border-green-500"
                                  value={prod.name}
                                  onChange={(e) =>
                                    updateProduct(
                                      pkgIdx,
                                      pIdx,
                                      "name",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="ex: Panou fotovoltaic"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                  Specificație
                                </label>
                                <input
                                  type="text"
                                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-base sm:text-sm sm:py-2 focus:ring-green-500 focus:border-green-500"
                                  value={prod.spec}
                                  onChange={(e) =>
                                    updateProduct(
                                      pkgIdx,
                                      pIdx,
                                      "spec",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="ex: 550W monocristalin"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                  Cantitate
                                </label>
                                <input
                                  type="number"
                                  step="any"
                                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-base sm:text-sm sm:py-2 text-right focus:ring-green-500 focus:border-green-500"
                                  value={prod.quantity}
                                  onChange={(e) =>
                                    updateProduct(
                                      pkgIdx,
                                      pIdx,
                                      "quantity",
                                      parseFloat(e.target.value) || 0,
                                    )
                                  }
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                  Unitate
                                </label>
                                <input
                                  type="text"
                                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-base sm:text-sm sm:py-2 focus:ring-green-500 focus:border-green-500"
                                  value={prod.unit}
                                  onChange={(e) =>
                                    updateProduct(
                                      pkgIdx,
                                      pIdx,
                                      "unit",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="buc"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                  Preț/u (€)
                                </label>
                                <input
                                  type="number"
                                  step="any"
                                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-base sm:text-sm sm:py-2 text-right focus:ring-green-500 focus:border-green-500"
                                  value={prod.unitPrice}
                                  onChange={(e) =>
                                    updateProduct(
                                      pkgIdx,
                                      pIdx,
                                      "unitPrice",
                                      parseFloat(e.target.value) || 0,
                                    )
                                  }
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                  Total (€)
                                </label>
                                <div className="w-full bg-white border border-gray-200 rounded-md px-3 py-2.5 sm:py-2 text-base sm:text-sm text-right font-semibold text-green-700">
                                  {prod.totalPrice.toLocaleString("ro-RO")}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {pkg.products.length > 0 && (
                        <div className="mt-4 flex justify-end">
                          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 text-sm font-bold text-green-700">
                            Subtotal echipamente:{" "}
                            {pkg.products
                              .reduce((s, p) => s + p.totalPrice, 0)
                              .toLocaleString("ro-RO")}{" "}
                            €
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Submit ── */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 shadow-sm flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              {loading ? "Se salvează..." : "Salvează serviciu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
