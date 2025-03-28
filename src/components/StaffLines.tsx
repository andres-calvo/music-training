import React from 'react';
import Note from './Note';

interface StaffLinesProps {
  width?: number;
  height?: number;
  lineSpacing?: number;
  notePosition?: number;
  clefType?: 'treble' | 'bass';
}

const StaffLines: React.FC<StaffLinesProps> = ({
  width = 300,
  height = 200,
  lineSpacing = 20,
  notePosition,
  clefType = 'treble'
}) => {
  // Calculamos las posiciones Y de las líneas visibles desde abajo hacia arriba
  const visibleLinesY = [
    height / 2 + (2 * lineSpacing),  // Primera línea visible (Mi en Sol, Sol en Fa)
    height / 2 + lineSpacing,        // Segunda línea (Sol en Sol, Si en Fa)
    height / 2,                      // Tercera línea (Si en Sol, Re en Fa)
    height / 2 - lineSpacing,        // Cuarta línea (Re en Sol, Fa en Fa)
    height / 2 - (2 * lineSpacing)   // Quinta línea (Fa en Sol, La en Fa)
  ];

  return (
    <div className="relative">
      <svg width={width} height={height}>
        {clefType === 'treble' ? (
          // Clave de Sol
          <g transform={`translate(15, ${height/2 + 90}) scale(0.015, -0.015)`}>
            <path
              d="M2834 12037 c-115 -117 -246 -257 -292 -312 -295 -354 -445 -723 -512 -1265 -18 -140 -24 -641 -11 -818 20 -259 67 -574 155 -1037 6 -27 -4 -41 -85 -135 -241 -279 -568 -693 -696 -885 -337 -504 -544 -1042 -620 -1610 -21 -164 -24 -609 -5 -765 64 -508 252 -995 517 -1340 287 -374 760 -700 1185 -818 151 -43 383 -70 602 -73 l98 -1 10 -37 c18 -67 32 -372 25 -541 -18 -445 -85 -698 -245 -935 -171 -252 -424 -441 -693 -519 -276 -80 -545 -44 -683 92 -71 70 -76 86 -67 205 l8 102 45 0 c25 -1 102 -7 172 -14 217 -22 346 14 456 127 104 106 136 206 130 407 l-3 120 -48 99 c-41 82 -62 112 -130 180 -139 139 -253 182 -457 173 -261 -11 -428 -115 -531 -332 -95 -200 -121 -498 -65 -760 36 -168 111 -306 243 -446 171 -181 367 -278 673 -335 290 -53 497 -16 756 137 228 135 421 334 565 584 186 324 268 729 253 1255 -3 116 0 237 8 325 l13 140 35 17 c19 10 98 43 175 74 322 129 556 261 720 403 307 266 560 767 615 1214 16 130 13 452 -5 592 -74 573 -374 1084 -808 1374 -105 71 -302 164 -412 196 -152 44 -271 58 -440 51 -127 -4 -217 -15 -532 -63 -29 -5 -33 -2 -38 23 -6 30 -40 165 -106 414 -30 117 -38 167 -41 256 -3 110 -3 110 27 146 17 20 105 123 197 229 485 562 695 888 853 1324 131 363 182 720 157 1113 -37 597 -224 1119 -534 1487 -109 129 -387 395 -414 395 -6 0 -105 -96 -220 -213z m583 -914 c19 -25 73 -179 103 -298 76 -297 61 -565 -46 -823 -86 -207 -250 -430 -608 -822 -239 -263 -336 -363 -342 -357 -4 3 -10 55 -15 114 -4 59 -15 162 -24 228 -25 188 -31 572 -12 735 36 307 146 578 331 813 119 153 240 258 446 385 73 45 89 51 120 46 19 -3 40 -13 47 -21z m-920 -3929 c25 -74 113 -387 113 -403 0 -5 -51 -51 -112 -102 -153 -126 -332 -307 -396 -402 -207 -302 -271 -771 -156 -1139 71 -225 256 -489 430 -614 34 -24 75 -47 91 -50 41 -8 80 27 103 95 16 48 16 58 4 94 -17 48 -85 151 -171 259 -78 99 -118 175 -144 276 -48 188 5 482 118 661 71 112 235 246 308 253 l40 3 38 -115 c100 -306 253 -1013 317 -1463 42 -301 76 -787 68 -977 -3 -69 -5 -75 -28 -81 -14 -4 -134 -7 -266 -8 -274 -1 -359 9 -517 63 -341 117 -731 526 -907 954 -93 224 -127 405 -116 622 19 420 141 819 348 1143 29 45 169 232 311 415 141 184 296 387 342 452 79 110 116 144 149 136 5 -1 20 -33 33 -72z m998 -959 c117 -21 247 -65 354 -120 290 -150 494 -467 567 -885 23 -131 23 -373 0 -505 -39 -217 -134 -467 -238 -627 -125 -191 -268 -308 -596 -486 -62 -34 -117 -62 -122 -62 -6 0 -10 48 -10 114 0 133 -32 548 -60 788 -42 359 -106 718 -226 1278 -47 216 -56 275 -59 384 -2 71 -1 134 2 139 8 14 277 1 388 -18z"
              fill="black"
            />
          </g>
        ) : (
          // Clave de Fa
          <g transform={`translate(0, ${height/2 - 63}) scale(0.1)`}>
            <path
              d="m 190.85272,451.25133 c 11.66109,14.71933 32.32286,24.49078 55.84396,24.49078 36.40052,0 65.88892,-23.37191 65.88892,-52.21386 0,-28.84194 -29.4884,-52.21385 -65.88892,-52.21385 -20.31367,4.15224 -28.5933,9.00067 -33.14336,-2.90906 17.97648,-54.32728 46.91788,-66.70942 96.54591,-66.70942 65.91378,0 96.96859,59.89675 96.96859,142.96652 -18.22512,190.63031 -205.94638,286.75353 -246.57373,316.1922 5.6938,13.10319 5.39543,12.63078 5.39543,12.00919 189.78494,-86.20259 330.68777,-204.42969 330.68777,-320.74227 0,-92.41853 -58.57898,-175.58775 -187.72125,-172.80301 -77.57488,0 -170.31663,86.20259 -118.00332,171.93278 z M 518.95466,361.3689 c 0,17.85217 14.4707,32.32286 32.32286,32.32286 17.85217,0 32.32287,-14.47069 32.32287,-32.32286 0,-17.85217 -14.4707,-32.32286 -32.32287,-32.32286 -17.85216,0 -32.32286,14.47069 -32.32286,32.32286 z m 0,136.75058 c 0,17.85217 14.4707,32.32287 32.32286,32.32287 17.85217,0 32.32287,-14.4707 32.32287,-32.32287 0,-17.85217 -14.4707,-32.32286 -32.32287,-32.32286 -17.85216,0 -32.32286,14.47069 -32.32286,32.32286 z"
              fill="black"
            />
          </g>
        )}

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