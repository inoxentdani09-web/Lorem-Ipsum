const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();
const MONGO_URI = process.env.MONGO_URI?.trim();
const JWT_SECRET = process.env.JWT_SECRET?.trim() || "default_jwt_secret";
const PORT = Number(process.env.PORT) || 5000;

// ===== OFFLINE MODE FLAG =====
let isOfflineMode = false;

console.log("🔧 Loading environment variables...");
console.log("MONGO_URI present:", !!MONGO_URI);
console.log("JWT_SECRET present:", !!JWT_SECRET);

// ===== MIDDLEWARE =====
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176", "http://localhost:5177", "http://localhost:5178", "http://127.0.0.1:5173", "http://127.0.0.1:5174", "http://127.0.0.1:5175", "http://127.0.0.1:5176", "http://127.0.0.1:5177", "http://127.0.0.1:5178"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/images", express.static(path.join(__dirname, "images")));
console.log("📁 Static images folder served at /images");

// ===== DEFAULT SHOES =====
const defaultShoes = [
  {
    brand: "Nike",
    size: "EU 38",
    color: "Red / White",
    price: 120,
    description: "Comfortable Nike running shoes perfect for daily jogging.",
    img: "/images/shoes.avif",
  },
  {
    brand: "Adidas",
    size: "EU 40",
    color: "White / Blue",
    price: 110,
    description: "Lightweight Adidas sports shoes with breathable material.",
    img: "/images/adidas.webp",
  },
  {
    brand: "Puma",
    size: "EU 39",
    color: "Black / White",
    price: 95,
    description: "Stylish Puma sneakers designed for casual wear.",
    img: "/images/pumashoes.webp",
  },
  {
    brand: "Reebok",
    size: "EU 41",
    color: "Grey / White",
    price: 100,
    description: "Classic Reebok training shoes with strong grip.",
    img: "/images/reebookshoes.webp",
  },
  {
    brand: "New Balance",
    size: "EU 42",
    color: "Navy Blue",
    price: 130,
    description: "Premium New Balance running shoes with extra comfort.",
    img: "/images/newbalance.jpg",
  },
  {
    brand: "Under Armour",
    size: "EU 43",
    color: "Black",
    price: 125,
    description: "Under Armour performance shoes for athletes.",
    img: "/images/underarmour.jpg",
  },
  {
    brand: "Converse",
    size: "EU 40",
    color: "White",
    price: 85,
    description: "Classic Converse sneakers perfect for street style.",
    img: "/images/converse.jpg",
  },
  {
    brand: "Vans",
    size: "EU 41",
    color: "Black / White",
    price: 90,
    description: "Trendy Vans skate shoes with durable sole.",
    img: "/images/vans.webp",
  },
  {
    brand: "Skechers",
    size: "EU 42",
    color: "Grey",
    price: 105,
    description: "Soft Skechers walking shoes with memory foam.",
    img: "/images/skechers.jpg",
  },
  {
    brand: "Asics",
    size: "EU 39",
    color: "Blue / Green",
    price: 115,
    description: "High performance Asics running shoes for sports.",
    img: "/images/asics.webp",
  },
  {
    brand: "Fila",
    size: "EU 44",
    color: "Black",
    price: 120,
    description: "Stylish Fila sneakers with comfortable cushioning.",
    img: "/images/fila.webp",
  },
  {
    brand: "Mizuno",
    size: "EU 36",
    color: "Black",
    price: 115,
    description: "Mizuno running shoes engineered for performance.",
    img: "/images/Mizuno2.webp",
  },
];

// ===== IN-MEMORY USER STORE (for offline mode) =====
let offlineUsers = [];
let offlineShoes = [];

// ===== MONGODB CONNECTION =====
async function connectMongoDB() {
  if (!MONGO_URI) {
    console.log("⚠️ MONGO_URI not found - running in offline mode");
    isOfflineMode = true;
    return false;
  }

  try {
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Reduced timeout
      maxPoolSize: 10,
    });
    console.log("✅ MongoDB connected");
    isOfflineMode = false;
    return true;
  } catch (err) {
    console.log("⚠️ MongoDB connection failed - running in offline mode");
    console.log("Error:", err.message);
    isOfflineMode = true;
    return false;
  }
}

// ===== SCHEMAS =====
const shoeSchema = new mongoose.Schema({
  brand: { type: String, required: true, trim: true },
  size: { type: String, required: true, trim: true },
  color: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  description: { type: String, required: true, trim: true },
  img: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Shoe = mongoose.models.Shoe || mongoose.model("Shoe", shoeSchema);
const User = mongoose.models.User || mongoose.model("User", userSchema);
const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

// ===== MULTER =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const imagesDir = path.join(__dirname, "images");
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ===== UTILS =====
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ===== ROUTES =====

// TEST ROUTE
app.delete("/test", (req, res) => {
  console.log("🧪 TEST ROUTE CALLED");
  res.json({ message: "Test route works" });
});

app.get("/testget", (req, res) => {
  console.log("🧪 TEST GET ROUTE CALLED");
  res.json({ message: "Test GET route works" });
});

// GET ALL SHOES
app.get("/api/shoes", async (req, res) => {
  try {
    console.log("📋 Fetching shoes...");

    // Check if MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      // Use MongoDB
      const shoes = await Shoe.find().sort({ createdAt: -1 });
      const shoesWithId = shoes.map((shoe) => ({ ...shoe.toObject(), id: shoe._id }));
      console.log(`✅ Found ${shoesWithId.length} shoes`);
      res.status(200).json(shoesWithId);
    } else {
      // Use in-memory store (offline mode)
      const shoesWithId = [...defaultShoes, ...offlineShoes].map((shoe, index) => ({
        ...shoe,
        id: shoe.id || `default-${index}`
      }));
      console.log(`✅ Found ${shoesWithId.length} shoes (offline mode)`);
      res.status(200).json(shoesWithId);
    }
  } catch (err) {
    console.error("❌ GET SHOES ERROR:", err.message);
    // Fallback to default shoes on any error
    console.log("📋 Returning default shoes due to error...");
    const shoesWithId = defaultShoes.map((shoe, index) => ({ ...shoe, id: `default-${index}` }));
    res.status(200).json(shoesWithId);
  }
});

// ADD SHOE
app.post("/api/shoes", upload.single("image"), async (req, res) => {
  try {
    console.log("➕ Adding new shoe...");
    const { brand, size, color, price, description } = req.body;

    if (!brand || !size || !color || !price || !description) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ error: "All shoe fields are required." });
    }

    const imageUrl = req.file
      ? `http://localhost:5000/images/${req.file.filename}`
      : "";

    // Check if MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      // Use MongoDB
      const newShoe = await Shoe.create({
        brand: brand.trim(),
        size: size.trim(),
        color: color.trim(),
        price: Number(price),
        description: description.trim(),
        img: imageUrl,
      });

      console.log("✅ Shoe added:", newShoe._id);
      res.status(201).json({ ...newShoe.toObject(), id: newShoe._id });
    } else {
      // Use in-memory store (offline mode)
      const newShoe = {
        id: `offline-${Date.now()}`,
        brand: brand.trim(),
        size: size.trim(),
        color: color.trim(),
        price: Number(price),
        description: description.trim(),
        img: imageUrl,
        createdAt: new Date()
      };

      offlineShoes.push(newShoe);
      console.log("✅ Shoe added (offline mode):", newShoe.id);
      res.status(201).json(newShoe);
    }
  } catch (err) {
    console.error("❌ ADD SHOE ERROR:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE SHOE
app.delete("/api/shoes/:id", async (req, res) => {
  console.log("🚨 DELETE ROUTE CALLED for ID:", req.params.id, "isOfflineMode:", isOfflineMode);
  try {
    console.log("🗑️ Deleting shoe:", req.params.id);
    console.log("🔗 isOfflineMode:", isOfflineMode);
    const shoeId = req.params.id;

    // Check if we're in offline mode
    if (isOfflineMode) {
      console.log("🔗 Using offline mode");
      // Use in-memory store (offline mode)
      const shoeIndex = offlineShoes.findIndex(shoe => shoe.id === shoeId);
      if (shoeIndex === -1) {
        console.log("❌ Shoe not found (offline mode)");
        return res.status(404).json({ error: "Shoe not found." });
      }

      offlineShoes.splice(shoeIndex, 1);
      console.log("✅ Shoe deleted (offline mode)");
      res.status(200).json({ message: "Deleted", id: shoeId });
    } else {
      console.log("🔗 Using MongoDB mode");
      // Use MongoDB
      if (!mongoose.Types.ObjectId.isValid(shoeId)) {
        console.log("❌ Invalid shoe ID");
        return res.status(400).json({ error: "Invalid shoe id." });
      }

      const deleted = await Shoe.findByIdAndDelete(shoeId);
      if (!deleted) {
        console.log("❌ Shoe not found");
        return res.status(404).json({ error: "Shoe not found." });
      }

      console.log("✅ Shoe deleted");
      res.status(200).json({ message: "Deleted", id: shoeId });
    }
  } catch (err) {
    console.error("❌ DELETE SHOE ERROR:", err.message);
    res.status(500).json({ error: "Delete failed" });
  }
});

// ===== ROUTES =====
console.log("🔗 DELETE route registered");
app.post("/api/signup", async (req, res) => {
  try {
    console.log("👤 User signup attempt");
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ error: "All fields are required." });
    }

    if (!validateEmail(email)) {
      console.log("❌ Invalid email");
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    // Check if MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      // Use MongoDB
      const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
      if (existingUser) {
        console.log("❌ Email already exists");
        return res.status(409).json({ error: "Email is already registered." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
      });

      const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, {
        expiresIn: "7d",
      });

      console.log("✅ User created:", newUser._id);
      return res.status(201).json({
        message: "User created successfully.",
        user: {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
        token,
      });
    } else {
      // Use in-memory store (offline mode)
      const existingUser = offlineUsers.find(user => user.email === email.toLowerCase().trim());
      if (existingUser) {
        console.log("❌ Email already exists (offline mode)");
        return res.status(409).json({ error: "Email is already registered." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: Date.now().toString(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        createdAt: new Date()
      };

      offlineUsers.push(newUser);

      const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, {
        expiresIn: "7d",
      });

      console.log("✅ User created (offline mode):", newUser.id);
      return res.status(201).json({
        message: "User created successfully (offline mode).",
        user: {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
        token,
      });
    }
  } catch (err) {
    console.error("❌ SIGNUP ERROR:", err.message);
    return res.status(500).json({ error: "Unable to create account." });
  }
});

// LOGIN
app.post("/api/login", async (req, res) => {
  try {
    console.log("🔐 User login attempt");
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({ error: "Email and password are required." });
    }

    // Check if MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      // Use MongoDB
      const user = await User.findOne({ email: email.toLowerCase().trim() });
      if (!user) {
        console.log("❌ User not found");
        return res.status(401).json({ error: "Invalid email or password." });
      }

      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) {
        console.log("❌ Password mismatch");
        return res.status(401).json({ error: "Invalid email or password." });
      }

      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "7d",
      });

      console.log("✅ Login successful:", user._id);
      return res.status(200).json({
        message: "Login successful.",
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        token,
      });
    } else {
      // Use in-memory store (offline mode)
      const user = offlineUsers.find(user => user.email === email.toLowerCase().trim());
      if (!user) {
        console.log("❌ User not found (offline mode)");
        return res.status(401).json({ error: "Invalid email or password." });
      }

      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) {
        console.log("❌ Password mismatch (offline mode)");
        return res.status(401).json({ error: "Invalid email or password." });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "7d",
      });

      console.log("✅ Login successful (offline mode):", user.id);
      return res.status(200).json({
        message: "Login successful (offline mode).",
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        token,
      });
    }
  } catch (err) {
    console.error("❌ LOGIN ERROR:", err.message);
    return res.status(500).json({ error: "Unable to sign in." });
  }
});

// CONTACT
app.post("/api/contact", async (req, res) => {
  try {
    console.log("📞 Contact form submission");
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || "",
      message: message.trim(),
    });

    console.log("✅ Contact saved:", contact._id);
    res.status(200).json({ message: "Contact saved ✅" });
  } catch (err) {
    console.error("❌ CONTACT ERROR:", err.message);
    res.status(500).json({ error: "Error saving contact" });
  }
});

// ===== SEED SHOES =====
async function seedShoes() {
  try {
    console.log("🌱 Checking if shoes need seeding...");
    const count = await Shoe.countDocuments();
    if (count === 0) {
      await Shoe.insertMany(defaultShoes);
      console.log("✅ Default shoes seeded");
    } else {
      console.log(`✅ ${count} shoes already exist`);
    }
  } catch (err) {
    console.error("❌ SEED ERROR:", err.message);
  }
}

// ===== START SERVER =====
async function startServer() {
  const mongoConnected = await connectMongoDB();

  if (mongoConnected) {
    await seedShoes();
  } else {
    console.log("⚠️ Server starting without MongoDB (some features may not work)");
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🔗 Offline mode: ${isOfflineMode}`);
  });
}

startServer();
