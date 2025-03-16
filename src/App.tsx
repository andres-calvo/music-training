import { useState, useEffect } from "react";
import StaffLines from "./components/StaffLines";

const NOTES = [
  { name: "Do", position: 1 },  // En la línea invisible
  { name: "Re", position: 2 },  // En el espacio entre línea invisible y primera línea
  { name: "Mi", position: 3 },  // En la primera línea
  { name: "Fa", position: 4 },  // En el espacio entre primera y segunda línea
  { name: "Sol", position: 5 }, // En la segunda línea
  { name: "La", position: 6 },  // En el espacio entre segunda y tercera línea
  { name: "Si", position: 7 }   // En la tercera línea
];

const BASE_TIMER = 30;

const getRandomNote = () => NOTES[Math.floor(Math.random() * NOTES.length)];

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

function App() {
  const [currentNote, setCurrentNote] = useState(getRandomNote());
  const [options, setOptions] = useState<string[]>([]);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [timer, setTimer] = useState(BASE_TIMER);
  const [message, setMessage] = useState("");
  const [isDebugMode, setIsDebugMode] = useState(false);

  useEffect(() => {
    const incorrectNotes = NOTES.filter(n => n.name !== currentNote.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    setOptions(shuffleArray([currentNote.name, ...incorrectNotes.map(n => n.name)]));
  }, [currentNote]);

  useEffect(() => {
    if (timer === 0) {
      setMessage("¡Tiempo agotado!");
    }
    const interval = setInterval(() => setTimer(t => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleAnswer = (answer: string) => {
    if (answer === currentNote.name) {
      setMessage("¡Correcto!");
    } else {
      setMessage("Incorrecto, intenta de nuevo.");
    }
    setTimeout(() => {
      setCurrentNote(getRandomNote());
      setMessage("");
      setTimer(BASE_TIMER / speedMultiplier);
    }, 2000);
  };

  const handleSpeedChange = (multiplier: number) => {
    setSpeedMultiplier(multiplier);
    setTimer(BASE_TIMER / multiplier);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold">Identifica la nota</h1>
      
      {/* Botón de Debug */}
      <button
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
        onClick={() => setIsDebugMode(!isDebugMode)}
      >
        {isDebugMode ? "Ocultar Debug" : "Mostrar Debug"}
      </button>

      {/* Modo Debug */}
      {isDebugMode && (
        <div className="mt-8 w-full max-w-2xl">
          <h2 className="text-xl font-bold mb-4">Modo Debug - Todas las notas</h2>
          <div className="space-y-8">
            {NOTES.map(note => (
              <div key={note.name} className="p-4 bg-gray-100 rounded">
                <h3 className="text-lg font-semibold mb-2">{note.name} (Posición {note.position})</h3>
                <StaffLines
                  width={400}
                  height={200}
                  lineSpacing={20}
                  notePosition={note.position}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Juego normal */}
      <div className="mt-4">
        <StaffLines 
          width={400} 
          height={200} 
          lineSpacing={20}
          notePosition={currentNote.position} 
        />
      </div>
      <div className="mt-4 bg-gray-200 p-4 rounded-lg text-2xl font-bold">
        Nota en la posición: {currentNote.position}
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {options.map(option => (
          <button
            key={option}
            className="bg-blue-500 text-white p-4 rounded-lg text-xl"
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <p className="mt-4 text-lg font-semibold">{message}</p>
      <p className="mt-2 text-red-500">Tiempo restante: {timer}s</p>
      <div className="mt-4 flex gap-4">
        <button className="bg-green-500 text-white p-2 rounded" onClick={() => handleSpeedChange(1)}>X1</button>
        <button className="bg-green-500 text-white p-2 rounded" onClick={() => handleSpeedChange(2)}>X2</button>
        <button className="bg-green-500 text-white p-2 rounded" onClick={() => handleSpeedChange(3)}>X3</button>
      </div>
    </div>
  );
}

export default App
