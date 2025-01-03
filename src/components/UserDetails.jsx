import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetails = () => {
   const { id } = useParams();
   const [user, setUser] = useState(null);
   const nav = useNavigate();

   useEffect(() => {
      axios
         .get(`https://jsonplaceholder.typicode.com/users/${id}`)
         .then((response) => {
            setUser(response.data);
         })
         .catch((error) => {
            console.error('Error fetching the user data', error);
         });
   }, [id]);

   if (!user) return <p className="text-center mt-[10%]">Loading...</p>;

   return (
      <div className="container mx-auto p-4">
         <h1 className="text-2xl font-bold text-center mb-6">User Details</h1>
         <div className="bg-white border-gray-300 border p-6 rounded-lg shadow-md">
            <p className="text-gray-700">
               <strong>Name: </strong> {user.name}
            </p>
            <p className="text-gray-700">
               <strong>Username: </strong> {user.username}
            </p>
            <p className="text-gray-700">
               <strong>Email: </strong> {user.email}
            </p>
            <p className="text-gray-700">
               <strong>Phone: </strong> {user.phone}
            </p>
            <p className="text-gray-700">
               <strong>Website: </strong> {user.website}
            </p>
            <p className="text-gray-700">
               <strong>Company: </strong> {user.company.name}
            </p>
            <h2 className="text-xl font-semibold mt-4">Address</h2>
            <p className="text-gray-700">
               <strong>Street: </strong> {user.address.street}
            </p>
            <p className="text-gray-700">
               <strong>Suite: </strong> {user.address.suite}
            </p>
            <p className="text-gray-700">
               <strong>City: </strong> {user.address.city}
            </p>
            <p className="text-gray-700">
               <strong>Zipcode: </strong> {user.address.zipcode}
            </p>
            <h2 className="text-xl font-semibold mt-4">Geo</h2>
            <p className="text-gray-700">
               <strong>Latitude: </strong> {user.address.geo.lat}
            </p>
            <p className="text-gray-700">
               <strong>Longitude: </strong> {user.address.geo.lng}
            </p>
         </div>
         <button
            className="bg-black mt-4 text-white rounded-sm shadow-md px-2 py-1"
            onClick={() => nav(-1)}
         >
            back
         </button>
      </div>
   );
};

export default UserDetails;
