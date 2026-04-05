import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddShoe({ onAddSuccess }) {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImg(file);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(URL.createObjectURL(file));
  };

  const handleAdd = async () => {
    // ❗ validation
    if (!brand || !price || !size || !color || !description) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("price", price);
    formData.append("color", color);
    formData.append("description", description);

    if (img) {
      formData.append("image", img);
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/shoes`, {
        method: "POST",
        body: formData,
      });

      let data;
      try {
        data = await res.json();
      } catch (jsonError) {
        console.error('JSON parsing error:', jsonError);
        alert("Server returned invalid response. Please try again.");
        return;
      }

      // ❗ ERROR FIX
      if (!res.ok) {
        alert(data.error || "Server error");
        return;
      }

      alert("Shoe Added Successfully ✅");

      if (onAddSuccess) {
        onAddSuccess();
      }

      // reset form
      setBrand("");
      setPrice("");
      setSize("");
      setColor("");
      setDescription("");
      setImg(null);
      setPreview("");

      // Redirect to home page
      navigate('/');

    } catch (err) {
      console.error(err);
      alert("Error adding product ❌");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAdd();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        <div className="relative bg-black flex items-center justify-center p-6">
          {preview ? (
            <img
              className="w-full object-center rounded-xl"
              src={preview}
              alt="preview"
            />
          ) : (
            <p className="text-white">No Image Selected</p>
          )}
        </div>

        <div className="p-8 flex flex-col justify-center space-y-4">

          <h2 className="text-2xl font-bold">Product Details</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand" className="w-full p-3 border rounded-xl" />
            <input value={size} onChange={(e) => setSize(e.target.value)} placeholder="Size" className="w-full p-3 border rounded-xl" />
            <input value={color} onChange={(e) => setColor(e.target.value)} placeholder="Color" className="w-full p-3 border rounded-xl" />
            <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="w-full p-3 border rounded-xl" />

            <input type="file" accept="image/*" onChange={handleImage} className="border-2 rounded-2xl px-3 py-1 border-dotted w-1/2" />

            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full p-3 border rounded-xl" />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Adding Product..." : "Save Product"}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}

export default AddShoe;