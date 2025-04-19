// components/QuillEditor.jsx
import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const QuillEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) return; // Prevent multiple initializations

    if (editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write something...",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            ["link", "image"],
          ],
        },
      });

      quillRef.current.on("text-change", () => {
        // Update the value when the editor content changes
        onChange(quillRef.current.root.innerHTML);
      });

      // Set initial value if provided
      if (value) {
        quillRef.current.root.innerHTML = value;
      }
    }
  }, [value, onChange]);

  return <div ref={editorRef} style={{ minHeight: "200px" }} />;
};

export default QuillEditor;
