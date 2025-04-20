const PetCard = ({ pet }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden transition-transform hover:scale-105 w-[20vw] m-auto mb-6">
      <img
        src={pet.image || 'https://robohash.org/mail@ashallendesign.co.uk'}
        alt={pet.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{pet.name}</h2>
        <p className="text-gray-600">Breed: {pet.breed}</p>
        <p className="text-gray-600">Age: {pet.age} years</p>
        <p className="text-gray-600">Location: {pet.location}</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PetCard;
