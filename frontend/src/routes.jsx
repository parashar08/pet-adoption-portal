import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Body from './components/Body';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AddPet from './pages/AddPet';
import Pet from './pages/Pet';

const appRoutes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Body />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'addPet',
        element: <AddPet />,
      },
      {
        path: 'pet/:petId',
        element: <Pet />,
      },
    ],
  },
]);

export default appRoutes;
