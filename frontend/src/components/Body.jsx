import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PetCard from './PetCard';

const Body = () => {
  const [petData, setPetData] = useState([]);

  const pet = {
    name: 'dot',
    breed: 'Animal',
    age: 4,
    location: 'India',
  };

  const fetchPetData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/pet/demopets', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log(result);
      setPetData(result.data);
    } catch (error) {
      console.log('ERROR WHIEL RETURNING DATA!!!', error);
      return <div>ERROR!!! ${error.message}</div>;
    }
  };

  useEffect(() => {
    fetchPetData();
  }, []);

  return (
    <main className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Find Your Perfect Pet
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            We help you find the ideal companion for your home. Explore our
            collection of adoptable pets today!
          </p>
          <Link>
            <span className="bg-blue-600 text-white py-3 px-6 rounded-lg text-xl hover:bg-blue-700">
              Start Adopting
            </span>
          </Link>
        </section>
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Featured Pets for Adoption
          </h3>
          <div className="flex flex-wrap">
            {petData.map((item, index) => (
              <PetCard key={item?._id} pet={item} />
            ))}
          </div>
        </section>
        <section className="text-center py-12 bg-blue-400 text-white rounded-lg shadow-lg">
          <h3 className="text-3xl font-semibold mb-4">Ready to Adopt?</h3>
          <p className="text-lg mb-6">
            Take the first step toward bringing a furry friend into your home.
          </p>
          <Link
            to="/adopt"
            className="bg-yellow-500 text-black py-3 px-6 rounded-lg text-xl hover:bg-yellow-600"
          >
            Browse Pets for Adoption
          </Link>
        </section>
      </div>
    </main>
  );
};

export default Body;
