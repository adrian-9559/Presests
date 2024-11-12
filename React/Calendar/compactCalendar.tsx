import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isWeekend } from 'date-fns';

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date()); // Estado para el mes actual
    const [currentDay, setCurrentDay] = useState(new Date()); // Estado para el día actual
    const [selectedDate, setSelectedDate] = useState(new Date()); // Estado para la fecha seleccionada

    // Función para avanzar al siguiente mes
    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    // Función para retroceder al mes anterior
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    // Función para manejar el clic en una fecha
    const onDateClick = (day: Date) => setSelectedDate(day);

    // Renderiza el encabezado del calendario con los botones de navegación
    const renderHeader = () => (
        <div className="flex justify-between items-center mb-4">
            <button onClick={prevMonth} className="text-black text-lg font-bold px-2 py-1 bg-[#94d8be] rounded">{"<"}</button>
            <span className="text-lg font-bold">{format(currentMonth, 'MMMM yyyy')}</span>
            <button onClick={nextMonth} className="text-black text-lg font-bold px-2 py-1 bg-[#94d8be] rounded">{">"}</button>
        </div>
    );

    // Renderiza los días de la semana (Lunes, Martes, etc.)
    const renderDays = () => {
        const days = [];
        const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 }); // La semana empieza en lunes

        // Itera sobre los días de la semana
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="w-full text-center font-bold" key={i}>
                    {format(addDays(startDate, i), 'EEEEEE')}
                </div>
            );
        }

        return <div className="flex justify-center">{days}</div>;
    };

    // Renderiza las celdas del calendario con los días del mes
    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth); // Inicio del mes actual
        const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Inicio de la semana del primer día del mes
        const endDate = endOfWeek(endOfMonth(monthStart), { weekStartsOn: 1 }); // Fin de la semana del último día del mes
        const rows = [];
        let days = [];
        let day = startDate;

        // Itera sobre los días desde el inicio hasta el fin del mes
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const cloneDay = day;
                days.push(
                    <div
                        className={`w-full h-16 flex justify-center cursor-pointer rounded-lg ${!isSameMonth(day, monthStart) ? 'text-gray-400' : ''} ${isSameDay(day, currentDay) ? 'bg-[#94d8be] text-black rounded-md' : 'bg-default-50'} ${isWeekend(day) ? 'bg-red-100 text-red-600' : ''} `}
                        key={day.toString()}
                        role="button"
                        tabIndex={0}
                        onClick={() => onDateClick(cloneDay)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                onDateClick(cloneDay);
                            }
                        }}
                    >
                        <span>{format(day, 'd')}</span>
                    </div>
                );
                day = addDays(day, 1); // Avanza al siguiente día
            }
            rows.push(<div className="flex gap-1" key={day.toString()}>{days}</div>);
            days = []; // Reinicia los días para la siguiente semana
        }

        return <div className='grid gap-1'>{rows}</div>;
    };

    return (
        <div className="p-4 rounded-lg shadow-md">
            <section>
                {renderHeader()}
            </section>
            <section>
                {renderDays()}
            </section>
            <section>
                {renderCells()}
            </section>
        </div>
    );
};

export default Calendar;