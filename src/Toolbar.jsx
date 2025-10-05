import React from 'react';

// A simple functional component for the toolbar buttons
const ToolbarButton = ({ onClick, title, children }) => (
  <button onClick={onClick} title={title} className="toolbar-button">
    {children}
  </button>
);

const Toolbar = ({ onInsert }) => {
  return (
    <div className="toolbar">
      <ToolbarButton onClick={() => onInsert('bold')} title="Bold"><b>B</b></ToolbarButton>
      <ToolbarButton onClick={() => onInsert('italic')} title="Italic"><i>I</i></ToolbarButton>
      <ToolbarButton onClick={() => onInsert('heading')} title="Heading">H1</ToolbarButton>
      <ToolbarButton onClick={() => onInsert('link')} title="Link">[ ]( )</ToolbarButton>
      <ToolbarButton onClick={() => onInsert('quote')} title="Quote">&gt;</ToolbarButton>
      <ToolbarButton onClick={() => onInsert('code')} title="Code">{`<>`}</ToolbarButton>
      <ToolbarButton onClick={() => onInsert('list')} title="List">-</ToolbarButton>
    </div>
  );
};

export default Toolbar;