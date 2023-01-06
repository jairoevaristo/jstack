import { Router } from 'express';
import { upload } from './app/libs/multer';

import { createCategory } from './app/useCases/categories/createCategory';
import { listCategory } from './app/useCases/categories/listCategories';
import { listProductByCategory } from './app/useCases/categories/listProductsByCategory';

import { cancelOrder } from './app/useCases/orders/cancelOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { createOrders } from './app/useCases/orders/createOrders';
import { listOrders } from './app/useCases/orders/listOrders';

import { createProduct } from './app/useCases/products/createProduct';
import { listProduct } from './app/useCases/products/listProduct';

export const router = Router();

router.get('/categories', listCategory);

router.post('/categories', createCategory);

router.get('/products', listProduct);

router.post('/products', upload.single('image'), createProduct);

router.get('/categories/:categoryId/products', listProductByCategory);

router.get('/orders', listOrders);

router.post('/orders', createOrders);

router.patch('/orders/:orderId', changeOrderStatus);

router.delete('/orders/:orderId', cancelOrder);