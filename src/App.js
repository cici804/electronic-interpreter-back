import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import IndexRouter from './router/IndexRouter';
function App() {
  const GetRoutes = () => useRoutes(IndexRouter); //一定要是函数内
  
  return (
    <Router>
      <GetRoutes />
    </Router>
  );
}
export default App;
