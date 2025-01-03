import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UsersTable = () => {
   const [users, setUsers] = useState([]);
   const [filteredUsers, setFilteredUsers] = useState([]);
   const [searchQuery, setSearchQuery] = useState('');
   const navigate = useNavigate();

   // Fetch users data
   useEffect(() => {
      axios
         .get('https://jsonplaceholder.typicode.com/users')
         .then((response) => {
            setUsers(response.data);
            setFilteredUsers(response.data); // Initialize filtered users
         })
         .catch((error) => {
            console.error('Error fetching the users data', error);
         });
   }, []);

   useEffect(() => {
      const filtered = users.filter((user) =>
         [user.name, user.username, user.email, user.phone]
            .join(' ')
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
   }, [searchQuery, users]);

   const handleRowClick = (userId) => {
      navigate(`/user/${userId}`);
   };

   return (
      <div className="container mx-auto p-4">
         <h1 className="text-2xl font-bold text-center mb-6">Users Table</h1>
         {/* Search Bar */}
         <div className="relative mb-4 mt-2 w-full lg:w-1/3 mx-auto">
            <input
               type="text"
               placeholder="Search by name, username, email, or phone"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-3 pr-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
         </div>
         {/* Table */}
         <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded border border-gray-300">
               <thead className="bg-blue-600">
                  <tr>
                     <th className="py-2 px-4 min-w-[10rem] border-b-2 border-r-2 border-gray-300 text-white">
                        Name
                     </th>
                     <th className="py-2 px-4 min-w-[10rem] border-b-2 border-r-2 border-gray-300 text-white">
                        Username
                     </th>
                     <th className="py-2 px-4 min-w-[10rem] border-b-2 border-r-2 border-gray-300 text-white">
                        Email
                     </th>
                     <th className="py-2 px-4 min-w-[10rem] border-b-2 border-r-2 border-gray-300 text-white">
                        Phone
                     </th>
                     <th className="py-2 px-4 min-w-[10rem] border-b-2 border-r-2 border-gray-300 text-white">
                        Action
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {filteredUsers.map((user, index) => (
                     <tr
                        key={user.id}
                        onClick={() => handleRowClick(user.id)}
                        className={`hover:bg-gray-100 hover:cursor-pointer transition-colors ${
                           index % 2 === 0 ? '' : 'bg-gray-50'
                        }`}
                     >
                        <td className="py-3 min-w-[10rem] px-4 border-b border-r-2 border-gray-300">
                           <span className="line-clamp-1 truncate">
                              {user.name}
                           </span>
                        </td>
                        <td className="py-3 min-w-[10rem] px-4 border-b border-r-2 border-gray-300">
                           {user.username}
                        </td>
                        <td className="py-3 min-w-[10rem] px-4 border-b border-r-2 border-gray-300">
                           {user.email}
                        </td>
                        <td className="py-3 min-w-[10rem] px-4 border-b border-r-2 border-gray-300">
                           <span className="line-clamp-1 truncate">
                              {user.phone}
                           </span>
                        </td>
                        <td className="py-3 min-w-[10rem] px-4 items-center flex justify-center border-b border-r-2 border-gray-300">
                           <button className="bg-gray-300 w-fit mx-auto hover:bg-gray-400 transition ease-in duration-200 rounded-md px-4 py-1">
                              View Details
                           </button>
                        </td>
                     </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                     <tr>
                        <td
                           colSpan="5"
                           className="text-center py-4 text-gray-500"
                        >
                           No results found.
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default UsersTable;
