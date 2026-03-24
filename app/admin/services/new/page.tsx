"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Package {
  name: string;
  kw: number;
  price: number;
  popular: boolean;
  description: string;
  features: string[];
}

export default function NewService() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    description: "",
    icon: "",
    image: "",
  });
  const [packages, setPackages] = useState<Package[]>([
    {
      name: "",
      kw: 0,
      price: 0,
      popular: false,
      description: "",
      features: [""],
    },
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
    } catch (error) {
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
          packages: packages.filter((p) => p.name.trim() !== ""),
        }),
      });

      if (res.ok) {
        router.push("/admin/services");
      } else {
        alert("Eroare la salvarea serviciului");
      }
    } catch (error) {
      alert("Eroare la salvarea serviciului");
    } finally {
      setLoading(false);
    }
  };

  const addPackage = () => {
    setPackages([
      ...packages,
      {
        name: "",
        kw: 0,
        price: 0,
        popular: false,
        description: "",
        features: [""],
      },
    ]);
  };

  const updatePackage = (index: number, field: keyof Package, value: any) => {
    const newPackages = [...packages];
    newPackages[index] = { ...newPackages[index], [field]: value };
    setPackages(newPackages);
  };

  const addFeature = (packageIndex: number) => {
    const newPackages = [...packages];
    newPackages[packageIndex].features.push("");
    setPackages(newPackages);
  };

  const updateFeature = (
    packageIndex: number,
    featureIndex: number,
    value: string,
  ) => {
    const newPackages = [...packages];
    newPackages[packageIndex].features[featureIndex] = value;
    setPackages(newPackages);
  };

  const removePackage = (index: number) => {
    setPackages(packages.filter((_, i) => i !== index));
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

      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Adaugă Serviciu Nou
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white shadow px-4 py-5 sm:p-6">
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

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Icon (emoji)
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    value={formData.icon}
                    onChange={(e) =>
                      setFormData({ ...formData, icon: e.target.value })
                    }
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Imagine URL (opțional)
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="bg-white shadow px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Pachete</h3>
                <button
                  type="button"
                  onClick={addPackage}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  Adaugă pachet
                </button>
              </div>

              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-md p-4 mb-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-medium text-gray-900">
                      Pachet {index + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removePackage(index)}
                      className="px-3 py-1 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50"
                    >
                      Șterge
                    </button>
                  </div>

                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Nume
                      </label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        value={pkg.name}
                        onChange={(e) =>
                          updatePackage(index, "name", e.target.value)
                        }
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        KW
                      </label>
                      <input
                        type="number"
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        value={pkg.kw}
                        onChange={(e) =>
                          updatePackage(index, "kw", parseFloat(e.target.value))
                        }
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Preț (RON)
                      </label>
                      <input
                        type="number"
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        value={pkg.price}
                        onChange={(e) =>
                          updatePackage(
                            index,
                            "price",
                            parseFloat(e.target.value),
                          )
                        }
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Descriere
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        value={pkg.description}
                        onChange={(e) =>
                          updatePackage(index, "description", e.target.value)
                        }
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                          checked={pkg.popular}
                          onChange={(e) =>
                            updatePackage(index, "popular", e.target.checked)
                          }
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Popular
                        </span>
                      </label>
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Caracteristici
                      </label>
                      {pkg.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex mb-2">
                          <input
                            type="text"
                            className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            value={feature}
                            onChange={(e) =>
                              updateFeature(index, featureIndex, e.target.value)
                            }
                            placeholder="Caracteristică..."
                          />
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addFeature(index)}
                        className="mt-2 px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        + Adaugă caracteristică
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Se salvează..." : "Salvează serviciu"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
