import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="px-4">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
