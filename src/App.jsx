import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersTable from './components/UsersTable';
import UserDetails from './components/UserDetails';

const App = () => {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<UsersTable />} />
            <Route path="/user/:id" element={<UserDetails />} />
         </Routes>
      </Router>
   );
};

export default App;
