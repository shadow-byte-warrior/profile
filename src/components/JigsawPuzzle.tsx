import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle, CheckCircle2, RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";

interface JigsawPuzzleProps {
  imageUrl: string;
  onSolve?: () => void;
}

const JigsawPuzzle: React.FC<JigsawPuzzleProps> = ({ imageUrl, onSolve }) => {
  const GRID_SIZE = 3;
  const [pieces, setPieces] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);

  const initializePuzzle = () => {
    const newPieces = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i);
    // Shuffle logic (Fisher-Yates)
    for (let i = newPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newPieces[i], newPieces[j]] = [newPieces[j], newPieces[i]];
    }
    setPieces(newPieces);
    setSolved(false);
    setSelectedPiece(null);
  };

  useEffect(() => {
    initializePuzzle();
  }, [imageUrl]);

  const checkSolved = (currentPieces: number[]) => {
    const isSolved = currentPieces.every((p, i) => p === i);
    if (isSolved) {
      setSolved(true);
      if (onSolve) onSolve();
    }
  };

  const handleSwap = (index: number) => {
    if (solved) return;

    if (selectedPiece === null) {
      setSelectedPiece(index);
    } else {
      const newPieces = [...pieces];
      [newPieces[selectedPiece], newPieces[index]] = [newPieces[index], newPieces[selectedPiece]];
      setPieces(newPieces);
      setSelectedPiece(null);
      checkSolved(newPieces);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto group">
      <div 
        className="grid grid-cols-3 gap-1 bg-muted/20 p-1 rounded-3xl overflow-hidden aspect-video border border-border/50 relative shadow-2xl"
        style={{
          backgroundImage: solved ? `url(${imageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <AnimatePresence>
          {!solved && pieces.map((piece, displayIndex) => {
            const row = Math.floor(piece / GRID_SIZE);
            const col = piece % GRID_SIZE;
            
            return (
              <motion.div
                key={`${piece}-${displayIndex}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                onClick={() => handleSwap(displayIndex)}
                className={`relative cursor-pointer overflow-hidden rounded-lg transition-all ${
                  selectedPiece === displayIndex ? "ring-4 ring-accent z-10 scale-95" : "hover:scale-[1.02]"
                }`}
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
                  backgroundPosition: `${(col / (GRID_SIZE - 1)) * 100}% ${(row / (GRID_SIZE - 1)) * 100}%`,
                }}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-1 left-1 text-[8px] font-mono text-white/20 select-none">
                  #{piece}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Win Overlay */}
        {solved && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-accent/20 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="bg-background/90 p-6 rounded-full shadow-2xl"
            >
              <CheckCircle2 className="w-16 h-16 text-accent" />
            </motion.div>
            <p className="mt-4 text-white font-display font-bold text-2xl drop-shadow-lg">DECRYPTED</p>
          </motion.div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Image Security</span>
          <span className="text-sm font-medium">
            {solved ? "Decrypted Access Granted" : "Fragmented: Solve to View"}
          </span>
        </div>
        
        <div className="flex gap-2">
          {!solved && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSolved(true)}
              className="rounded-xl border-border/50 text-xs hover:bg-accent/10 hover:text-accent"
            >
              Skip
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={initializePuzzle}
            className="rounded-xl hover:bg-muted group"
          >
            <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
          </Button>
        </div>
      </div>

      {/* Glow Effect */}
      <div className={`absolute -inset-4 bg-accent/10 blur-3xl rounded-full -z-10 transition-opacity duration-1000 ${solved ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
};

export default JigsawPuzzle;
