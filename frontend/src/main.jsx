import { createRoot } from 'react-dom/client';
import appRoutes from './routes';
import './index.css';
import { RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRoutes} />
);
