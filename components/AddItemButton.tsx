"use client";

interface AddItemButtonProps {
    texte: string;
    onClick: () => void;
}

export default function AddItemButton({ texte, onClick }: AddItemButtonProps) {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClick}
        >
            {texte}
        </button>
    );
}