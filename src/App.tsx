import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <div className='container'>
      <Routes>
        <Route path="/" element={
          <HomePage />
        } />
        <Route path="/articles/:id" element={<ArticlePage/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
