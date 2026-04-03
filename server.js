const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ IMPORTANT: absolute path fix
app.use("/images", express.static(path.join(__dirname, "images")));
let shoesData = [ { id: 1, brand: "Nike", size: "EU 38", color: "Red / White", price: 120, description: "Comfortable Nike running shoes perfect for daily jogging.", img: "http://localhost:5000/images/shoes.avif" }, { id: 2, brand: "Adidas", size: "EU 40", color: "White / Blue", price: 110, description: "Lightweight Adidas sports shoes with breathable material.", img: "http://localhost:5000/images/adidas.webp" }, { id: 3, brand: "Puma", size: "EU 39", color: "Black / White", price: 95, description: "Stylish Puma sneakers designed for casual wear.", img: "http://localhost:5000/images/pumashoes.webp" }, { id: 4, brand: "Reebok", size: "EU 41", color: "Grey / White", price: 100, description: "Classic Reebok training shoes with strong grip.", img: "http://localhost:5000/images/reebookshoes.webp" }, { id: 5, brand: "New Balance", size: "EU 42", color: "Navy Blue", price: 130, description: "Premium New Balance running shoes with extra comfort.", img: "http://localhost:5000/images/newbalance.jpg" }, { id: 6, brand: "Under Armour", size: "EU 43", color: "Black", price: 125, description: "Under Armour performance shoes for athletes.", img: "http://localhost:5000/images/underarmour.jpg" }, { id: 7, brand: "Converse", size: "EU 40", color: "White", price: 85, description: "Classic Converse sneakers perfect for street style.", img: "http://localhost:5000/images/converse.jpg" }, { id: 8, brand: "Vans", size: "EU 41", color: "Black / White", price: 90, description: "Trendy Vans skate shoes with durable sole.", img: "http://localhost:5000/images/vans.webp" }, { id: 9, brand: "Skechers", size: "EU 42", color: "Grey", price: 105, description: "Soft Skechers walking shoes with memory foam.", img: "http://localhost:5000/images/skechers.jpg" }, { id: 10, brand: "Asics", size: "EU 39", color: "Blue / Green", price: 115, description: "High performance Asics running shoes for sports.", img: "http://localhost:5000/images/asics.webp" }, { id: 11, brand: "Fila", size: "EU 49", color: "Black", price: 120, description: "Stylish Fila sneakers with comfortable cushioning for daily wear.", img: "http://localhost:5000/images/fila.webp" }, { id: 12, brand: "Mizuno", size: "EU 36", color: "Black", price: 115, description: "Mizuno running shoes engineered for high performance and superior comfort", img: "http://localhost:5000/images/Mizuno2.webp" } ];
// 🔥 make sure images folder exists
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "images"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ DATA
// let shoesData = [];

// GET
app.get("/api/shoes", (req, res) => {
  res.json(shoesData);
});

// POST (ADD PRODUCT)
app.post("/api/shoes", upload.single("image"), (req, res) => {
  const { brand, size, color, price, description } = req.body;

  const newShoe = {
    id: Date.now(),
    brand,
    size,
    color,
    price,
    description,
    img: req.file
      ? `http://localhost:5000/images/${req.file.filename}`
      : "",
  };

  shoesData.push(newShoe);

  res.json(newShoe);
});

// DELETE
app.delete("/api/shoes/:id", (req, res) => {
  const id = Number(req.params.id);

  shoesData = shoesData.filter((shoe) => shoe.id !== id);

  res.json({ message: "Deleted", id });
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});