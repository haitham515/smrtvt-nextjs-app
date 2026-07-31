export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#d3cccc]">
      <div className="flex flex-col items-center space-y-5">
        
        {/* Spinner moderne */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          {/* Anneau de fond discret */}
          <div className="absolute h-full w-full rounded-full border-4 border-white/20"></div>
          {/* Anneau actif rotatif */}
          <div className="absolute h-full w-full rounded-full border-4 border-t-[#2D2A2A] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        
        {/* Texte élégant */}
        <div className="flex flex-col items-center space-y-1">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#2D2A2A] uppercase animate-pulse">
            Chargement
          </p>
          <span className="text-[10px] text-[#2D2A2A]/60 italic font-light">
            Veuillez patienter
          </span>
        </div>

      </div>
    </div>
  );
}