import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Body from './components/Body';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AddPet from './pages/AddPet';
import Pet from './pages/Pet';
import Home from './pages/Home';
import Adopt from './pages/Adopt';
import AdoptPet from './pages/AdoptPet';

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
        path: 'home',
        element: <Home />,
      },
      {
        path: 'adopt',
        element: <Adopt />,
      },
      {
        path: 'pet/:petId',
        element: <AdoptPet />,
      },
    ],
  },
]);

export default appRoutes;
