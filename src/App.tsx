import { useState, useEffect } from "react";
import StaffLines from "./components/StaffLines";

const NOTES = [
  { name: "Do3", position: 1 },   // Do de la octava 3 (línea invisible)
  { name: "Re3", position: 2 },   // Re de la octava 3 (espacio)
  { name: "Mi3", position: 3 },   // Mi de la octava 3 (primera línea)
  { name: "Fa3", position: 4 },   // Fa de la octava 3 (espacio)
  { name: "Sol3", position: 5 },  // Sol de la octava 3 (segunda línea)
  { name: "La3", position: 6 },   // La de la octava 3 (espacio)
  { name: "Si3", position: 7 },   // Si de la octava 3 (tercera línea)
  { name: "Do4", position: 8 },   // Do de la octava 4 (espacio)
  { name: "Re4", position: 9 },   // Re de la octava 4 (cuarta línea)
  { name: "Mi4", position: 10 },  // Mi de la octava 4 (espacio)
  { name: "Fa4", position: 11 },  // Fa de la octava 4 (quinta línea)
  { name: "Sol4", position: 12 }, // Sol de la octava 4 (espacio arriba)
  { name: "La4", position: 13 }   // La de la octava 4 (línea adicional arriba)
];

const BASE_TIMER = 15;

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
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  useEffect(() => {
    const incorrectNotes = NOTES.filter(n => n.name !== currentNote.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    setOptions(shuffleArray([currentNote.name, ...incorrectNotes.map(n => n.name)]));
  }, [currentNote]);

  useEffect(() => {
    if (timer === 0) {
      setMessage("¡Tiempo agotado!");
      setStreak(0); // Reiniciar racha cuando se agota el tiempo
    }
    const interval = setInterval(() => setTimer(t => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleAnswer = (answer: string) => {
    if (answer === currentNote.name) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBestStreak(Math.max(bestStreak, newStreak));
      setMessage("¡Correcto!");
    } else {
      setStreak(0); // Reiniciar racha en respuesta incorrecta
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
      
      {/* Contador de racha */}
      <div className="mt-4 flex gap-4 items-center">
        <div className="text-lg">
          Racha actual: <span className="font-bold text-blue-600">{streak}</span>
        </div>
        <div className="text-lg">
          Mejor racha: <span className="font-bold text-green-600">{bestStreak}</span>
        </div>
      </div>
      
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
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        {options.map(option => (
          <button
            key={option}
            className="bg-blue-500 text-white p-8 cursor-pointer rounded-lg text-xl"
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
