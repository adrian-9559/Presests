import { useEffect, useState } from "react";

export default function AnalogicalClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const getRotation = (unit: number, max: number) => (unit / max) * 360;

    return (
        <section className="flex flex-col gap-2 justify-center w-64">
            <div className="relative aspect-square rounded-full border-4 border-foreground flex items-center justify-center" style={{ width: "80%", maxWidth: "300px" }}>
                {/* Hour Hand */}
                <div
                    className="absolute w-[2%] h-[25%] bg-foreground"
                    style={{
                        transform: `rotate(${getRotation(time.getHours() % 12, 12)}deg) translateY(-45%)`
                    }}
                ></div>
                {/* Minute Hand */}
                <div
                    className="absolute w-[1.5%] h-[35%] bg-foreground"
                    style={{
                        transform: `rotate(${getRotation(time.getMinutes(), 60)}deg) translateY(-45%)`
                    }}
                ></div>
                {/* Second Hand */}
                <div
                    className="absolute w-[1%] h-[40%] bg-foreground"
                    style={{
                        transform: `rotate(${getRotation(time.getSeconds(), 60)}deg) translateY(-45%)`
                    }}
                ></div>

                {/* Center Point */}
                <div className="absolute w-[5%] h-[5%] bg-white rounded-full"></div>

                {/* Markers */}
                {[...Array(12)].map((_, index) => (
                    <div
                        key={index}
                        className="absolute w-[2%] h-[10%] bg-foreground"
                        style={{
                            transform: `rotate(${index * 30}deg) translateY(-400%)`
                        }}
                    ></div>
                ))}
            </div>
        </section>
    );
}