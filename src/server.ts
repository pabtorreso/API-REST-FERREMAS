import { app } from './index';

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { server };
