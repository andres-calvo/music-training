import React from 'react';
import Note from './Note';

interface StaffLinesProps {
  width?: number;
  height?: number;
  lineSpacing?: number;
  notePosition?: number;
}

const StaffLines: React.FC<StaffLinesProps> = ({
  width = 300,
  height = 200,
  lineSpacing = 20,
  notePosition
}) => {
  // Calculamos las posiciones Y de las líneas visibles desde abajo hacia arriba
  const visibleLinesY = [
    height / 2 + (2 * lineSpacing),  // Primera línea visible (Mi)
    height / 2 + lineSpacing,        // Segunda línea (Sol)
    height / 2,                      // Tercera línea (Si)
    height / 2 - lineSpacing,        // Cuarta línea
    height / 2 - (2 * lineSpacing)   // Quinta línea
  ];

  return (
    <div className="relative">
      <svg width={width} height={height}>
        {/* Líneas visibles del pentagrama */}
        {visibleLinesY.map((y, index) => (
          <line
            key={index}
            x1={0}
            y1={y}
            x2={width}
            y2={y}
            stroke="black"
            strokeWidth={1}
          />
        ))}
      </svg>
      
      {/* Renderizamos la nota si se proporciona una posición */}
      {notePosition && (
        <div className="absolute top-0 left-0">
          <Note
            position={notePosition}
            width={width}
            height={height}
            lineSpacing={lineSpacing}
          />
        </div>
      )}
    </div>
  );
};

export default StaffLines; 