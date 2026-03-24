"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UploadedFile {
  name: string;
  url: string;
  date: string;
}

export default function AdminUploads() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    loadFiles();
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

  const loadFiles = async () => {
    try {
      const res = await fetch("/api/admin/uploads");
      if (res.ok) {
        const data = await res.json();
        setFiles(data);
      }
    } catch (error) {
      console.error("Error loading files:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    setUploading(true);

    for (const file of Array.from(fileList)) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          setFiles([data, ...files]);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    setUploading(false);
    e.target.value = "";
  };

  const deleteFile = async (name: string, url: string) => {
    if (!confirm("Ești sigur că vrei să ștergi acest fișier?")) return;

    try {
      const res = await fetch(
        `/api/admin/uploads/${encodeURIComponent(name)}?url=${encodeURIComponent(url)}`,
        { method: "DELETE" },
      );
      if (res.ok) {
        setFiles(files.filter((f) => f.name !== name));
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("URL copiat în clipboard!");
  };

  if (loading || !isAuthenticated) {
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
                href="/admin/dashboard"
                className="text-gray-500 hover:text-gray-700"
              >
                ← Înapoi la dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Gestionare Fișiere
          </h1>

          <div className="bg-white shadow px-4 py-5 sm:p-6 mb-6">
            <div className="flex items-center justify-center">
              <label className="w-full">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg py-12 hover:border-gray-400 cursor-pointer">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20m-8-12l-4-4m0 0l-4 4m4-4v12"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-medium text-green-600 hover:text-green-500">
                      Click pentru a selecta fișiere
                    </span>{" "}
                    sau trage fișierele aici
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF până la 10MB
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>
            {uploading && (
              <p className="text-center mt-4 text-sm text-gray-600">
                Se încarcă...
              </p>
            )}
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Fișiere încărcate ({files.length})
              </h3>
            </div>

            {files.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Niciun fișier încărcat</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {files.map((file) => (
                  <li key={file.name} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <img
                            src={file.url}
                            alt={file.name}
                            className="h-12 w-12 rounded object-cover"
                          />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {file.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(file.date).toLocaleDateString("ro-RO")}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 flex items-center space-x-2">
                        <button
                          onClick={() => copyUrl(file.url)}
                          className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Copiază URL
                        </button>
                        <button
                          onClick={() => deleteFile(file.name, file.url)}
                          className="px-3 py-1 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50"
                        >
                          Șterge
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
