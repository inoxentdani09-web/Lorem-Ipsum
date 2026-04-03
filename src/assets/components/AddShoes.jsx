import { useState } from "react";

function AddShoe({ onAddSuccess }) {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState("");

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
    const formData = new FormData();

    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("price", price);
    formData.append("color", color);
    formData.append("description", description);
    formData.append("image", img);

    try {
      const res = await fetch("http://localhost:5000/api/shoes", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      alert("Shoe Added Successfully");

      if (onAddSuccess) {
        onAddSuccess();
      }

      setBrand("");
      setPrice("");
      setSize("");
      setColor("");
      setDescription("");
      setImg(null);
      setPreview("");
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        <div className="relative bg-black flex items-center justify-center p-6">
          {preview ? (
            <img className="w-full object-center rounded-xl" src={preview} />
          ) : (
            <p className="text-white">No Image Selected</p>
          )}
        </div>

        <div className="p-8 flex flex-col justify-center space-y-4">

          <h2 className="text-2xl font-bold">Product Details</h2>

          <input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand" className="w-full p-3 border rounded-xl" />
          <input value={size} onChange={(e) => setSize(e.target.value)} placeholder="Size" className="w-full p-3 border rounded-xl" />
          <input value={color} onChange={(e) => setColor(e.target.value)} placeholder="Color" className="w-full p-3 border rounded-xl" />
          <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="w-full p-3 border rounded-xl" />

          <input type="file" accept="image/*" onChange={handleImage} className="border-2 rounded-2xl px-3 py-1 border-dotted w-1/2" />

          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full p-3 border rounded-xl" />

          <button onClick={handleAdd} className="w-full bg-black text-white py-3 rounded-xl">
            Save Product
          </button>

        </div>

      </div>
    </div>
  );
}

export default AddShoe;