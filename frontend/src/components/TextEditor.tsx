

interface TextEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export const TextEditor = ({ content, onChange }: TextEditorProps) => {
  return (
    <div>
      <label className="block text-lg font-medium mb-2">Content</label>
      <textarea
        placeholder="Write your blog content here..."
        className="w-full border border-gray-300 rounded-lg px-4 py-2 h-60 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
        value={content}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
