import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isWeekend } from 'date-fns';

const Calendar = () => {
    // Estado para manejar el mes actual
    const [currentMonth, setCurrentMonth] = useState(new Date());
    // Estado para manejar el día actual
    const [currentDay, setCurrentDay] = useState(new Date());
    // Estado para manejar la fecha seleccionada por el usuario
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Función que avanza al siguiente mes
    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    // Función que retrocede al mes anterior
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    // Función para actualizar la fecha seleccionada cuando el usuario hace clic en un día
    const onDateClick = (day: Date) => setSelectedDate(day);

    // Renderiza el encabezado del calendario con los botones para navegar entre meses
    const renderHeader = () => (
        <div className="flex justify-between items-center mb-4">
            <button onClick={prevMonth} className="text-black text-lg font-bold px-2 py-1 bg-[#94d8be] rounded">{"<"}</button>
            <span className="text-lg font-bold">{format(currentMonth, 'MMMM yyyy')}</span>
            <button onClick={nextMonth} className="text-black text-lg font-bold px-2 py-1 bg-[#94d8be] rounded">{">"}</button>
        </div>
    );

    // Renderiza los nombres abreviados de los días de la semana (Lun, Mar, etc.)
    const renderDays = () => {
        const days = [];
        const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 }); // Configura el inicio de la semana en lunes

        // Genera los nombres de los días
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="w-full text-center font-bold" key={i}>
                    {format(addDays(startDate, i), 'EEEEEE')} {/* Muestra la abreviatura del día */}
                </div>
            );
        }

        return <div className="flex justify-center">{days}</div>;
    };

    // Renderiza las celdas con los días del mes
    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth); // Primer día del mes actual
        const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Inicio de la semana del primer día del mes
        const endDate = endOfWeek(endOfMonth(monthStart), { weekStartsOn: 1 }); // Fin de la semana del último día del mes
        const rows = []; // Contenedor para las filas (semanas) del calendario
        let days = []; // Contenedor para los días en cada fila
        let day = startDate; // Día inicial para iterar

        // Itera desde el inicio hasta el fin del rango de días visible en el calendario
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const cloneDay = day; // Clona la referencia para manejar clics sin problemas
                days.push(
                    <div
                        className={`w-full h-16 flex justify-center cursor-pointer rounded-lg 
                            ${!isSameMonth(day, monthStart) ? 'text-gray-400' : ''} /* Días fuera del mes actual */
                            ${isSameDay(day, currentDay) ? 'bg-[#94d8be] text-black rounded-md' : 'bg-default-50'} /* Día actual */
                            ${isWeekend(day) ? 'bg-red-100 text-red-600' : ''} /* Fin de semana */
                        `}
                        key={day.toString()} // Clave única para cada día
                        role="button" // Accesibilidad: indica que es interactivo
                        tabIndex={0} // Accesibilidad: permite navegar con teclado
                        onClick={() => onDateClick(cloneDay)} // Maneja el clic en un día
                        onKeyDown={(e) => { 
                            if (e.key === 'Enter' || e.key === ' ') { 
                                onDateClick(cloneDay); 
                            }
                        }} // Soporte para seleccionar con teclado
                    >
                        <span>{format(day, 'd')}</span> {/* Muestra el número del día */}
                    </div>
                );
                day = addDays(day, 1); // Avanza al siguiente día
            }
            // Agrega la fila actual al calendario y reinicia la fila para la próxima semana
            rows.push(<div className="flex gap-1" key={day.toString()}>{days}</div>);
            days = [];
        }

        return <div className="grid gap-1">{rows}</div>; // Contenedor de las filas (semanas)
    };

    // Renderiza el calendario completo
    return (
        <div className="p-4 rounded-lg shadow-md">
            <section>{renderHeader()}</section> {/* Encabezado del calendario */}
            <section>{renderDays()}</section> {/* Días de la semana */}
            <section>{renderCells()}</section> {/* Días del mes */}
        </div>
    );
};

export default Calendar;
