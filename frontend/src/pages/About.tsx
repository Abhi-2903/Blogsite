import { useState } from "react";
import AdSlot from "../components/AdSlot";

export const About = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("This is your about section.");
  const [draftText, setDraftText] = useState(text);

  const handleEdit = () => {
    setIsEditing(true);
    setDraftText(text);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setDraftText(text);
  };

  const handleSave = () => {
    setIsEditing(false);
    setText(draftText);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <label className="block text-lg font-semibold mb-2">About You</label>

      <textarea
        value={isEditing ? draftText : text}
        onChange={(e) => setDraftText(e.target.value)}
        readOnly={!isEditing}
        className={`w-full h-40 p-4 border rounded-lg resize-none transition-all duration-300
          ${isEditing ? "bg-white border-gray-300 cursor-text" : "bg-gray-100 border-transparent cursor-default"}
          focus:outline-none focus:ring-2 focus:ring-blue-400`}
      />

      <div className="mt-4 flex gap-3">
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit
          </button>
        )}
        {isEditing && (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
          </>
        )}
      </div>
      <AdSlot   slot="4881032173" />
      
    </div>
  );
};
