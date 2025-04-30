import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AdoptPet = () => {
  const [petData, setPetData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { petId } = useParams();
  const navigate = useNavigate();

  const fetchPetData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:3000/api/pet/getPet/${petId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();

      if (!result.success) {
        setErrorMessage('TRY AGAIN!');
        return;
      }

      setPetData(result.data);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage('CLIENT ERROR! TRY AGAIN');
    }
  };

  const handleClick = () => {
    alert('Pet adopted successfully!');
    navigate('/home');
  };

  useEffect(() => {
    fetchPetData();
  }, [petId]);

  if (errorMessage) {
    return <div className="text-red-500 text-center mt-6">{errorMessage}</div>;
  }

  if (!petData) {
    return <div className="text-center mt-6 text-xl">Loading pet info...</div>;
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full h-full flex flex-col md:flex-row items-center justify-center p-4">
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-full">
          <img
            src={petData.image[0]}
            alt={petData.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Pet Info Section */}
        <div className="w-full md:w-1/2 h-full p-6 flex flex-col justify-center text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            {petData.name}
          </h2>
          <p className="text-lg text-gray-600 mb-6">{petData.description}</p>

          <div className="grid grid-cols-2 gap-4 text-lg text-gray-700 mb-6">
            <div>
              <span className="font-semibold">Breed:</span> {petData.breed}
            </div>
            <div>
              <span className="font-semibold">Age:</span> {petData.age} years
            </div>
            <div>
              <span className="font-semibold">Gender:</span> {petData.gender}
            </div>
            <div>
              <span className="font-semibold">Color:</span> {petData.color}
            </div>
            <div>
              <span className="font-semibold">Size:</span> {petData.size}
            </div>
            <div>
              <span className="font-semibold">Type:</span> {petData.type}
            </div>
            <div>
              <span className="font-semibold">Location:</span>{' '}
              {petData.location}
            </div>
            <div>
              <span className="font-semibold">Adoption Fee:</span> ₹
              {petData.adoptionFee}
            </div>
          </div>

          <div className="text-lg text-gray-700 mb-6">
            <p>
              <span className="font-semibold">Vaccinated:</span>{' '}
              {petData.healthInfo.vaccinated ? 'Yes' : 'No'}
            </p>
            <p>
              <span className="font-semibold">Spayed/Neutered:</span>{' '}
              {petData.healthInfo.spayedNeutered ? 'Yes' : 'No'}
            </p>
            <p>
              <span className="font-semibold">Special Needs:</span>{' '}
              {petData.healthInfo.specialNeeds ? 'Yes' : 'No'}
            </p>
            <p>
              <span className="font-semibold">Additional Info:</span>{' '}
              {petData.healthInfo.additionalInfo}
            </p>
          </div>

          <div className="mt-8">
            {!petData.isAdopted ? (
              <button
                onClick={handleClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md transition text-xl"
              >
                Adopt Now
              </button>
            ) : (
              <div className="w-full text-red-500 font-semibold text-xl py-3">
                Already Adopted
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptPet;
