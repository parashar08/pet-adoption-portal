import PetCard from '../components/PetCard';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [pets, setPets] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchPetData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/pet/getAllPets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (!result.success) {
        setErrorMessage(result.message);
      }
      setPets(result.data);
      setErrorMessage(null);
    } catch (error) {
      console.log('ERROR!!!', error);
      setErrorMessage(error.message || 'Error while fetching data!');
    }
  };

  useEffect(() => {
    fetchPetData();
  }, []);

  if (errorMessage) {
    return <div>ERROR!! TRY AGAIN.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Available Pets for Adoption</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {pets.map((pet) => (
          <Link to={`/pet/${pet?._id}`} key={pet?._id}>
            <PetCard pet={pet} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
