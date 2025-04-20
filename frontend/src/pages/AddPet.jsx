import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../contextAPI/UserContext';

const AddPet = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <div>
        <div> DATA: {user.name}</div>
      </div>
    </div>
  );
};

export default AddPet;
