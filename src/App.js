import './App.css';
import { AuthGoogleProvider } from './Contexts/authGoogle';
import Rotas from './Routes/AppRoutes.js';

function App() {
  return (
    <AuthGoogleProvider>
      <Rotas />
    </AuthGoogleProvider>
    
  );
}

export default App;
