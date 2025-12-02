import { useParams } from "react-router-dom";
import { useState } from "react";

export default function SeatSelection() {
  const { id } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seats = Array.from({ length: 40 }, (_, i) => i + 1); // 40 cadeiras

  function toggleSeat(num) {
    if (selectedSeats.includes(num)) {
      setSelectedSeats(selectedSeats.filter(s => s !== num));
    } else {
      setSelectedSeats([...selectedSeats, num]);
    }
  }

  function confirmar() {
    alert(`Cadeiras escolhidas: ${selectedSeats.join(", ")}`);
  }

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white">

      <h1 className="text-3xl font-bold text-center mb-6">
        Escolha suas cadeiras — Sessão {id}
      </h1>

      {/* GRID DE CADEIRAS */}
      <div className="grid grid-cols-8 gap-3 mx-auto w-fit p-4 bg-gray-800 rounded-xl">

        {seats.map(num => {
          const isSelected = selectedSeats.includes(num);
          return (
            <button
              key={num}
              onClick={() => toggleSeat(num)}
              className={
                `w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold 
                transition 
                ${isSelected ? "bg-green-500" : "bg-gray-600 hover:bg-gray-500"}`
              }
            >
              {num}
            </button>
          );
        })}
      </div>

      {/* BOTÃO CONFIRMAR */}
      <div className="text-center mt-6">
        <button
          onClick={confirmar}
          className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Confirmar Assentos
        </button>
      </div>
    </div>
  );
}
