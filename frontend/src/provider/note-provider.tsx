import React, { createContext, useContext, useEffect, useState } from "react";
import type { Note } from "../../../shared/models/Note";
import type { ApiResponse } from "../../../shared/models/ApiResponse";

type NoteProviderProps = {
  children: React.ReactNode;
};

type NoteProviderState = {
  showNewNotePopup: boolean;
  setShowNewNotePopup: React.Dispatch<React.SetStateAction<boolean>>;
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

const initialState: NoteProviderState = {
  showNewNotePopup: false,
  setShowNewNotePopup: () => {},
  notes: [],
  setNotes: () => {},
};

const NoteProviderContext = createContext<NoteProviderState>(initialState);

export function NoteProvider({ children, ...props }: NoteProviderProps) {
  const [showNewNotePopup, setShowNewNotePopup] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response: ApiResponse<Note[]> =
          await window.noteController.readNotes();
        if (response.ok) {
          setNotes(response.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    }
    fetchNotes();
  }, []);

  const value = { showNewNotePopup, setShowNewNotePopup, notes, setNotes };
  return (
    <NoteProviderContext.Provider {...props} value={value}>
      {children}
    </NoteProviderContext.Provider>
  );
}

export const useNote = () => {
  const context = useContext(NoteProviderContext);

  if (context === undefined)
    throw new Error("useNote must be used within a NoteProvider");

  return context;
};
