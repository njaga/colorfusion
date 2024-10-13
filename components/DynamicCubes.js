import React from 'react';

const DynamicCubes = ({ backgroundColor = 'bg-yellow-200', frontColor = 'bg-yellow-400' }) => {
  return (
    <div className={`fixed inset-0 z-[-1] ${backgroundColor}`}>
      <div className="relative w-full h-full overflow-hidden">
        {/* Ici, vous pouvez implémenter l'animation des cubes dynamiques */}
        {/* Cet exemple crée simplement quelques cubes statiques */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`absolute ${frontColor} w-16 h-16 transform rotate-45`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DynamicCubes;