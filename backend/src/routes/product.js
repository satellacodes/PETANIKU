const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { authenticateToken } = require("../middleware/auth");
const { authorize } = require("../middleware/roles");
const ctrl = require("../controllers/productController");

// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(
      null,
      `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`,
    ),
});
const upload = multer({
  storage,
  limits: { fileSize: 4 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) cb(new Error("Must be image"));
    else cb(null, true);
  },
});

router.post(
  "/",
  authenticateToken,
  authorize("FARMER"),
  upload.single("image"),
  ctrl.createProduct,
);
router.get("/", authenticateToken, authenticateToken, ctrl.getProducts);
router.get("/:id", authenticateToken, ctrl.getProductById);
router.put(
  "/:id",
  authenticateToken,
  authorize("FARMER"),
  upload.single("image"),
  ctrl.updateProduct,
);
router.delete(
  "/:id",
  authenticateToken,
  authorize("FARMER"),
  ctrl.deleteProduct,
);
module.exports = router;
