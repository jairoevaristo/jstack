import { Router } from "express";

import { upload } from "./app/libs/multer";
import { ensureAutheticated } from "./app/middlewares/ensureAutheticated";
import { ensureAuthorization } from "./app/middlewares/ensureAuthorization";
import { createAdmin } from "./app/useCases/admin/createAdmin";
import { listAdmin } from "./app/useCases/admin/listAdmin";
import { loginAdmin } from "./app/useCases/admin/loginAdmin";

import { createCategory } from "./app/useCases/categories/createCategory";
import { listCategory } from "./app/useCases/categories/listCategories";
import { listProductByCategory } from "./app/useCases/categories/listProductsByCategory";

import { cancelOrder } from "./app/useCases/orders/cancelOrder";
import { changeOrderStatus } from "./app/useCases/orders/changeOrderStatus";
import { createOrders } from "./app/useCases/orders/createOrders";
import { listOrders } from "./app/useCases/orders/listOrders";

import { createProduct } from "./app/useCases/products/createProduct";
import { listProduct } from "./app/useCases/products/listProduct";
import { createUser } from "./app/useCases/user/createUser";
import { listUser } from "./app/useCases/user/listUser";
import { loginUser } from "./app/useCases/user/loginUser";
import { Type } from "./constants/type";

export const router = Router();

router.post("/admin/login", loginAdmin);
router.post("/user/login", loginUser);

router.use(ensureAutheticated);

router.get(
  "/categories",
  ensureAuthorization([Type.ADMIN, Type.USER]),
  listCategory
);

router.post(
  "/categories",
  ensureAuthorization([Type.ADMIN, Type.USER]),
  createCategory
);

router.get("/products", ensureAuthorization, listProduct);

router.post(
  "/products",
  upload.single("image"),
  ensureAuthorization([Type.ADMIN]),
  createProduct
);

router.get(
  "/categories/:categoryId/products",
  ensureAuthorization([Type.ADMIN, Type.USER]),
  listProductByCategory
);

router.get("/orders", ensureAuthorization([Type.ADMIN]), listOrders);

router.post("/orders", ensureAuthorization([Type.USER]), createOrders);

router.patch(
  "/orders/:orderId",
  ensureAuthorization([Type.ADMIN]),
  changeOrderStatus
);

router.delete(
  "/orders/:orderId",
  ensureAuthorization([Type.ADMIN]),
  cancelOrder
);

router.get("/admin", ensureAuthorization([Type.ADMIN]), listAdmin);

router.post("/admin/create", ensureAuthorization([Type.ADMIN]), createAdmin);

router.get("/admin/user/", ensureAuthorization([Type.ADMIN]), listUser);

router.post(
  "/admin/user/create",
  ensureAuthorization([Type.ADMIN]),
  createUser
);
