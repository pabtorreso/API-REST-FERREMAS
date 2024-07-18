import { app } from './index';
import productRoutes from './routes/productRoutes';
import inventoryRoutes from './routes/inventoryRoutes';

const PORT = process.env.PORT || 4000;

app.use('/api/products', productRoutes);
app.use('/api/inventories', inventoryRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { server };