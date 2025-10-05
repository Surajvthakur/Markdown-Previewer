import { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import Toolbar from './Toolbar';
import Presentation from './Presentation'; // Import the new Presentation component
import './App.css';

// Let's update the initial text to demonstrate slide creation
const initialMarkdown = `
# My Presentation
A Deck by Me

---

## Slide 2: Core Concepts
- React is a UI library
- State manages data
- Props pass data down

---

## Slide 3: Code Example
\`\`\`javascript
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
\`\`\`

--

### Sub-slide
This is a horizontal slide, created with '--'.

---

## The End
Questions?
`;

function App() {
  const [markdown, setMarkdown] = useState(() => {
    const saved = localStorage.getItem('markdown-text');
    return saved || initialMarkdown;
  });

  const [copyText, setCopyText] = useState('Copy HTML');
  const [isPresentationMode, setPresentationMode] = useState(false); // New state for presentation mode
  const editorRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('markdown-text', markdown);
  }, [markdown]);

  const createMarkup = () => {
    return { __html: marked(markdown) };
  };

  const handleCopyHtml = () => {
    const htmlToCopy = marked(markdown);
    navigator.clipboard.writeText(htmlToCopy).then(() => {
      setCopyText('Copied!');
      setTimeout(() => setCopyText('Copy HTML'), 2000);
    });
  };
  
  const handleToolbarInsert = (type) => {
    // ... (keep the existing handleToolbarInsert function, no changes needed)
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);
    let newText;

    switch (type) {
      case 'bold': newText = `**${selectedText}**`; break;
      case 'italic': newText = `*${selectedText}*`; break;
      case 'heading': newText = `# ${selectedText}`; break;
      case 'link': newText = `[${selectedText}](url)`; break;
      case 'quote': newText = `> ${selectedText}`; break;
      case 'code': newText = `\`${selectedText}\``; break;
      case 'list': newText = `- ${selectedText}`; break;
      default: newText = selectedText;
    }
    
    const updatedMarkdown = markdown.substring(0, start) + newText + markdown.substring(end);
    setMarkdown(updatedMarkdown);
    textarea.focus();
  };

  // If in presentation mode, render the Presentation component
  if (isPresentationMode) {
    return (
      <Presentation
        markdownContent={markdown}
        onExit={() => setPresentationMode(false)}
      />
    );
  }

  // Otherwise, render the editor
  return (
    <div className="app-container">
      <div className="editor-pane">
        <div className="editor-header">
          <Toolbar onInsert={handleToolbarInsert} />
          <button
            onClick={() => setPresentationMode(true)}
            className="presentation-button"
            title="Start Presentation"
          >
            ▶️ Present
          </button>
        </div>
        <textarea
          id="editor"
          ref={editorRef}
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
      </div>
      <div className="preview-pane-container">
        <button onClick={handleCopyHtml} className="copy-button">{copyText}</button>
        <div
          id="preview"
          className="preview-pane"
          dangerouslySetInnerHTML={createMarkup()}
        />
      </div>
    </div>
  );
}

export default App;