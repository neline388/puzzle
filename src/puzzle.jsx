    import React, { useEffect, useMemo, useState } from "react";

    export default function Puzzle({ imageUrl, rows = 4, cols = 4 }) {
    const baseSize = 350;
    const size = Math.min(window.innerWidth * 0.8, baseSize);
    const numPieces = rows * cols;

    const shuffled = useMemo(() => {
        const arr = Array.from({ length: numPieces }, (_, i) => i);
        return arr.sort(() => Math.random() - 0.5);
    }, []);

    const [pieces, setPieces] = useState(shuffled);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isSolved, setIsSolved] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const correctCount = pieces.filter((p, i) => p === i).length;

    useEffect(() => {
        if (correctCount === numPieces) {
        setIsSolved(true);
        const t = setTimeout(() => setIsSolved(false), 1500);
        return () => clearTimeout(t);
        }
    }, [correctCount, numPieces]);

    const handleSelect = (index) => {
        // If selecting the first piece
        if (selectedIndex === null) {
        setSelectedIndex(index);
        return;
        }

        // If selecting the same tile → unselect
        if (selectedIndex === index) {
        setSelectedIndex(null);
        return;
        }

        // Swap tiles
        const newPieces = [...pieces];
        [newPieces[selectedIndex], newPieces[index]] = [
        newPieces[index],
        newPieces[selectedIndex],
        ];

        setPieces(newPieces);
        setSelectedIndex(null);
    };

    return (
        <div className="d-flex flex-column align-items-center mt-4">
        <div className="card shadow-sm p-4" style={{ maxWidth: 420, width: "100%" }}>
            <button
            onClick={() => setShowHint(!showHint)}
            className="btn w-100 mb-3"
            style={{
                backgroundColor: "#8b5cf6",
                color: "white",
                fontWeight: "bold",
            }}
            >
            Hint
            </button>

            {showHint && (
            <div className="text-center mb-3">
                <div
                className="shadow-sm"
                style={{
                    width: 80,
                    height: 80,
                    overflow: "hidden",
                    borderRadius: 8,
                    border: "2px solid #eee",
                    margin: "0 auto",
                }}
                >
                <img
                    src={imageUrl}
                    alt="thumbnail"
                    style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    }}
                />
                </div>
            </div>
            )}

            <label className="fw-bold mb-1">
            Progress: {correctCount}/{numPieces}
            </label>

            <div className="progress mb-4">
            <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: (correctCount / numPieces) * 100 + "%" }}
            />
            </div>

            {isSolved && (
            <div
                className="alert alert-success text-center fw-bold solved-popup"
                style={{ fontSize: 22 }}
            >
                🎉 Puzzle Solved! 🎉
            </div>
            )}

            <div
            className={`puzzle-container ${isSolved ? "solved-border" : ""}`}
            style={{
                width: size,
                height: size,
                display: "grid",
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 0 10px rgba(0,0,0,0.15)",
            }}
            >
            {pieces.map((pieceIndex, i) => {
                const row = Math.floor(pieceIndex / cols);
                const col = pieceIndex % cols;

                return (
                <div
                    key={i}
                    onClick={() => handleSelect(i)}
                    className="puzzle-piece"
                    style={{
                    width: size / cols,
                    height: size / rows,
                    overflow: "hidden",
                    position: "relative",
                    cursor: "pointer",
                    border:
                        selectedIndex === i
                        ? "3px solid #8b5cf6"
                        : "1px solid #ddd",
                    boxSizing: "border-box",
                    }}
                >
                    <img
                    src={imageUrl}
                    alt="piece"
                    draggable={false}
                    style={{
                        width: size,
                        height: size,
                        position: "absolute",
                        top: -(row * size) / rows,
                        left: -(col * size) / cols,
                        objectFit: "cover",
                        userSelect: "none",
                        pointerEvents: "none",
                    }}
                    />
                </div>
                );
            })}
            </div>

            <button
            className="btn btn-primary mt-4 w-100"
            onClick={() => {
                const arr = Array.from({ length: rows * cols }, (_, i) => i);
                const newShuffle = arr.sort(() => Math.random() - 0.5);
                setPieces(newShuffle);
            }}
            >
            Mix again
            </button>
        </div>
        </div>
    );
    }
