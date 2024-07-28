import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InfoInput from './pages/InfoInput';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InfoInput />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;