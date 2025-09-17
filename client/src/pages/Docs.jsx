import React, { useState, useEffect } from "react";

const Docs = () => {
  const [savedDocs, setSavedDocs] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const openModal = (image) => {
    setModalImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage(null);
  };

  useEffect(() => {
    async function fetchDocs() {
      try {
        const res = await fetch("http://localhost:5000/api/documents");
        if (res.ok) {
          setSavedDocs(await res.json());
        }
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    }
    fetchDocs();
  }, []);

  const handleFileChange = (e) => setSelectedFiles([...e.target.files]);

  const handleSubmit = async () => {
    if (!name || !address || selectedFiles.length === 0) {
      return alert("Please fill in all fields and select at least one image");
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    selectedFiles.forEach((f) => formData.append("pictures", f));

    try {
      const res = await fetch("http://localhost:5000/api/documents/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        alert("Upload successful!");
        setName("");
        setAddress("");
        setSelectedFiles([]);
        const updatedRes = await fetch("http://localhost:5000/api/documents");
        setSavedDocs(updatedRes.ok ? await updatedRes.json() : savedDocs);
      } else throw new Error("Upload failed");
    } catch (err) {
      console.error(err);
      alert("Error uploading files");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-[1fr_2fr] gap-8 p-10 bg-gray-100 min-h-screen">
      <div className="space-y-4">
        <h2 className="text-lg font-black text-blue-950">Documentation</h2>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
        />
        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="input input-bordered w-full"
        />
        <label className="bg-white rounded-lg cursor-pointer border-dashed border-4 border-gray-400 w-full h-24 flex flex-col items-center justify-center text-gray-400 hover:border-blue-950 hover:text-blue-950">
          <div className="text-lg font-semibold">
            Upload Photo{selectedFiles.length > 1 ? "s" : ""}
          </div>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </label>
        {selectedFiles.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {selectedFiles.map((f, i) => (
              <div
                key={i}
                className="relative w-24 h-24 rounded overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(f)}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() =>
                    setSelectedFiles((sf) => sf.filter((_, j) => j !== i))
                  }
                  className="font-bold absolute top-0 right-0 bg-red-500 text-white px-2 rounded-bl cursor-pointer hover:bg-red-700"
                >
                  &minus;
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Uploading…" : "Submit"}
        </button>
      </div>

      <div className="space-y-4">
        {savedDocs.map((doc) => (
          <div
            key={doc._id}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <div className="flex overflow-x-auto gap-2 p-4">
              {doc.picturePath.map((path, idx) => (
                <div
                  key={idx}
                  className="relative w-20 h-20 rounded overflow-hidden cursor-pointer"
                  onClick={() => openModal(`http://localhost:5000/${path}`)}
                >
                  <img
                    src={`http://localhost:5000/${path}`}
                    alt={`doc-image-${idx}`}
                    className="w-full h-full object-cover rounded"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity">
                    View
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4">
              <h2 className="font-bold">{doc.name}</h2>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">{doc.address}</p>
              <p className="text-xs text-gray-400">
                {new Date(doc.createdAt).toLocaleString()}
              </p>
              </div>
            </div>
          </div>
        ))}

        {modalOpen && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-10"
            onClick={closeModal}
          >
            <img
              src={modalImage}
              alt="Full size"
              className="max-w-full max-h-full rounded"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-white text-3xl font-bold cursor-pointer"
            >
              &times;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Docs;
