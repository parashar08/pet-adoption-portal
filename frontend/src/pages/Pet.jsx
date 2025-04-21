import React from 'react';

const Pet = ({ pet, onClose }) => {
  if (!pet) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 overflow-y-auto max-h-[90vh] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Pet Image */}
        {pet.image?.[0] && (
          <img
            src={pet.image[0]}
            alt={pet.name}
            className="w-full h-72 object-cover rounded-t-2xl"
          />
        )}

        <div className="p-6">
          {/* Name + Basic */}
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{pet.name}</h2>
              <p className="text-sm text-gray-500 capitalize">
                {pet.type} • {pet.breed}
              </p>
            </div>
            <span
              className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm font-medium ${
                pet.isAdopted
                  ? 'bg-red-100 text-red-600'
                  : 'bg-green-100 text-green-600'
              }`}
            >
              {pet.isAdopted ? 'Adopted' : 'Available'}
            </span>
          </div>

          {/* Pet Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700 mb-6">
            <div>
              <span className="font-semibold">Age:</span> {pet.age} yrs
            </div>
            <div>
              <span className="font-semibold">Gender:</span> {pet.gender}
            </div>
            <div>
              <span className="font-semibold">Size:</span> {pet.size}
            </div>
            <div>
              <span className="font-semibold">Color:</span> {pet.color}
            </div>
            <div>
              <span className="font-semibold">Location:</span> {pet.location}
            </div>
            <div>
              <span className="font-semibold">Adoption Fee:</span> ₹
              {pet.adoptionFee}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed">{pet.description}</p>
          </div>

          {/* Health Info */}
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Health Information
            </h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Vaccinated: {pet.healthInfo?.vaccinated ? 'Yes' : 'No'}</li>
              <li>
                Spayed/Neutered: {pet.healthInfo?.spayedNeutered ? 'Yes' : 'No'}
              </li>
              <li>
                Special Needs: {pet.healthInfo?.specialNeeds ? 'Yes' : 'No'}
              </li>
              {pet.healthInfo?.additionalInfo && (
                <li>Additional Info: {pet.healthInfo.additionalInfo}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pet;
