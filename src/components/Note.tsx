import React from 'react';

interface NoteProps {
  position: number;  // 1 = Do3 (línea invisible), 2 = Re3 (espacio), ..., 13 = La4 (línea adicional arriba)
  lineSpacing?: number;
  width?: number;
  height?: number;
}

const Note: React.FC<NoteProps> = ({
  position,
  lineSpacing = 20,
  width = 300,
  height = 200
}) => {
  // El centro vertical del pentagrama
  const centerY = height / 2;
  
  // Calculamos la posición Y de la nota
  // Las posiciones impares (1,3,5,7) van sobre las líneas
  // Las posiciones pares (2,4,6) van en los espacios
  const baseY = centerY + (3 * lineSpacing); // Posición de la línea invisible (Do)
  const noteY = baseY - ((position - 1) * (lineSpacing / 2));
  
  // Dimensiones de la nota
  const noteWidth = lineSpacing * 1.2;
  const noteHeight = lineSpacing * 0.8;
  
  return (
    <svg width={width} height={height}>
      {/* Dibujamos la nota como una elipse negra */}
      <ellipse
        cx={width / 2}
        cy={noteY}
        rx={noteWidth / 2}
        ry={noteHeight / 2}
        fill="black"
      />
      
      {/* Si es Do3 (posición 1) o La4 (posición 13), dibujamos la línea que lo atraviesa */}
      {(position === 1 || position === 13) && (
        <line
          x1={(width / 2) - (noteWidth / 2) - 15}
          y1={noteY}
          x2={(width / 2) + (noteWidth / 2) + 15}
          y2={noteY}
          stroke="black"
          strokeWidth={1}
        />
      )}
    </svg>
  );
};

export default Note; 