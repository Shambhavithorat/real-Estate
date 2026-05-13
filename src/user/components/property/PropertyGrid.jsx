import React from 'react';
import PropertyCard from './PropertyCard';
import { properties as mockProperties } from '../../../shared/data/properties';

const PropertyGrid = ({ limit }) => {
  const properties = mockProperties.slice(0, limit || 6);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyGrid;
