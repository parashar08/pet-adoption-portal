import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import UserProvider from './contextAPI/UserContext';

function App() {
  return (
    <>
      <div className="px-4">
        <UserProvider>
          <Header />
          <Outlet />
          <Footer />
        </UserProvider>
      </div>
    </>
  );
}

export default App;
