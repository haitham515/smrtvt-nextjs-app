"use client"

interface ConfirmDeleteModalProps {
    titre: string
    onConfirm: () => void
    onCancel: () => void
    deleting: boolean
}

export default function ConfirmDeleteModal({
    titre,
    onConfirm,
    onCancel,
    deleting,
}: ConfirmDeleteModalProps) {
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full mx-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Confirmer la suppression
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                    Êtes-vous sûr de vouloir supprimer{" "}
                    <span className="font-semibold text-gray-700">"{titre}"</span> ?
                    Cette action est irréversible.
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-2 rounded-md border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={deleting}
                        className="flex-1 py-2 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-600 disabled:opacity-50 cursor-pointer"
                    >
                        {deleting ? "Suppression..." : "Supprimer"}
                    </button>
                </div>
            </div>
        </div>
    )
}