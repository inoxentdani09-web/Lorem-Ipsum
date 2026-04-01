import { useState } from "react";

function AddShoe() {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState("");
 console.log("IMG OBJECT:", img);
console.log("IMG NAME:", img?.name);
  // IMAGE HANDLER
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImg(file);

    // cleanup old preview (important fix)
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(URL.createObjectURL(file));
  };

const handleAdd = async () => {
  const newShoe = {
    id: Date.now(),
    brand,
    size,  
    price,
    color,
    description,
    img: preview
  };
 

  await fetch("http://localhost:5000/api/shoes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newShoe)
  });

  alert("Shoe Added!");
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* IMAGE PREVIEW */}
        <div className="relative bg-black flex items-center justify-center p-6">

          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="w-full h-[350px] object-contain rounded-xl"
            />
          ) : (
            <p className="text-white">No Image Selected</p>
          )}

          <div className="absolute bottom-4 left-4 text-white text-sm bg-black/40 px-3 py-1 rounded-full">
            Preview
          </div>
        </div>

        {/* FORM */}
        <div className="p-8 flex flex-col justify-center space-y-4">

          <h2 className="text-2xl font-bold">Product Details</h2>

          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full p-3 border rounded-xl"
            placeholder="Brand"
          />

          <input
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full p-3 border rounded-xl"
            placeholder="Size"
          />

          <input
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full p-3 border rounded-xl"
            placeholder="Color"
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border rounded-xl"
            placeholder="Price"
          />

          {/* CLEAN IMAGE UPLOAD UI */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>

            <label
              htmlFor="fileInput"
              className="cursor-pointer w-full flex items-center justify-center p-3 border-2 border-dashed border-gray-400 rounded-xl hover:bg-gray-100 transition"
            >
              📁 Click to Select Image
            </label>

            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />

            {img && (
              <p className="text-sm text-green-600 mt-2">
                Selected: {img.name}
              </p>
            )}
          </div>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-xl"
            placeholder="Description"
          />

          <button
            onClick={handleAdd}
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Save Product
          </button>

        </div>

      </div>
    </div>
  );
}

export default AddShoe;