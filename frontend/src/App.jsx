import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import UserProvider from './contextAPI/UserContext';
import { store } from './app/store.js';
import { Provider } from 'react-redux';

function App() {
  return (
    <>
      <div className="px-4">
        <UserProvider>
          <Provider store={store}>
            <Header />
            <Outlet />
            <Footer />
          </Provider>
        </UserProvider>
      </div>
    </>
  );
}

export default App;
