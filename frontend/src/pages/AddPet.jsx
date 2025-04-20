import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../contextAPI/UserContext';

const initialPetData = {
  name: '',
  type: '',
  breed: '',
  age: '',
  gender: '',
  size: '',
  color: '',
  description: '',
  adoptionFee: '',
  location: '',
  image: [],
  shelter: '',
  healthInfo: {
    vaccinated: false,
    spayedNeutered: false,
    specialNeeds: false,
    additionalInfo: '',
  },
};

const AddPet = () => {
  const [petData, setPetData] = useState(initialPetData);
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === 'image') {
      setPetData((prev) => ({
        ...prev,
        image: [...prev.image, ...Array.from(files)],
      }));
    } else if (name in petData.healthInfo) {
      setPetData((prev) => ({
        ...prev,
        healthInfo: {
          ...prev.healthInfo,
          [name]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      setPetData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');

    try {
      const formData = new FormData();

      for (const key in petData) {
        if (key === 'healthInfo') {
          for (const hKey in petData.healthInfo) {
            formData.append(`healthInfo[${hKey}]`, petData.healthInfo[hKey]);
          }
        } else if (key === 'image') {
          petData.image.forEach((img) => formData.append('image', img));
        } else if (key === 'shelter') {
          formData.append(key, user?._id);
        } else {
          formData.append(key, petData[key]);
        }
      }

      const response = await fetch('http://localhost:3000/api/pet/create', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('✅ Pet added successfully!');
        setPetData(initialPetData);
      } else {
        setMessage(result.message || '❌ Something went wrong');
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to submit');
    }
  };

  return (
    <div className="bg-gradient-to-br from-red-100 to-blue-200 min-h-screen flex items-center justify-center ">
      <div className="container max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl my-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Add a New Pet
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Pet Name"
              value={petData.name}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              type="text"
              name="type"
              placeholder="Type (Dog/Cat)"
              value={petData.type}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              type="text"
              name="breed"
              placeholder="Breed"
              value={petData.breed}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={petData.age}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              type="text"
              name="color"
              placeholder="Color"
              value={petData.color}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              type="number"
              name="adoptionFee"
              placeholder="Adoption Fee"
              value={petData.adoptionFee}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={petData.location}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              type="text"
              name="shelter"
              placeholder="Shelter ID"
              value={petData.shelter}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="gender"
              value={petData.gender}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unknown">Unknown</option>
            </select>

            <select
              name="size"
              value={petData.size}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="">Select Size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="x-large">X-Large</option>
            </select>
          </div>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            value={petData.description}
            onChange={handleChange}
            required
            className="input h-24"
          />

          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-1">Upload Images</label>
            <input
              type="file"
              name="image"
              multiple
              accept="image/*"
              onChange={handleChange}
              className="file-input"
            />
          </div>

          {/* Health Info */}
          <div className="border-t pt-4">
            <h4 className="font-semibold text-lg mb-2">Health Info</h4>
            <div className="flex items-center gap-6 flex-wrap">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="vaccinated"
                  checked={petData.healthInfo.vaccinated}
                  onChange={handleChange}
                />
                Vaccinated
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="spayedNeutered"
                  checked={petData.healthInfo.spayedNeutered}
                  onChange={handleChange}
                />
                Spayed/Neutered
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="specialNeeds"
                  checked={petData.healthInfo.specialNeeds}
                  onChange={handleChange}
                />
                Special Needs
              </label>
            </div>
            <textarea
              name="additionalInfo"
              placeholder="Additional Health Info"
              value={petData.healthInfo.additionalInfo}
              onChange={handleChange}
              className="input mt-3"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-medium"
          >
            Add Pet
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AddPet;
