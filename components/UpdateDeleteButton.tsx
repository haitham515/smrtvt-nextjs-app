"use client";

import { IconTrash, IconEdit } from '@tabler/icons-react';

const buttonStyle = {
    updateButton: "flex flex-row items-center gap-2 bg-[#00B37E] text-white font-bold py-2 px-4 rounded hover:bg-[#009468] active:bg-[#007a56] focus:outline-none focus:ring-2 focus:ring-[#00B37E] focus:ring-offset-2 transition-colors cursor-pointer",
    deleteButton: "flex flex-row items-center gap-2 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors cursor-pointer",
};

interface UpdateDeleteButtonProps {
    text?: string; // Rendu optionnel au cas où tu veux afficher uniquement l'icône
    onClick: () => void;
    variant: "update" | "delete";
}

export default function UpdateDeleteButton({ text, onClick, variant }: UpdateDeleteButtonProps) {
    const isUpdate = variant === "update";

    // On sélectionne dynamiquement l'icône et le style selon la variante
    const Icon = isUpdate ? IconEdit : IconTrash;
    const className = isUpdate ? buttonStyle.updateButton : buttonStyle.deleteButton;

    return (
        <button
            onClick={onClick}
            className={className}
        >
            <Icon size={18} />
            {text && <span>{text}</span>}
        </button>
    );
}