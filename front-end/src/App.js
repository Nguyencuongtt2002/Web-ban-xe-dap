import { Outlet } from 'react-router-dom';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
function App() {
  return (
    <>
      <div class="site">
        <Header />
        <div class="site__body">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
