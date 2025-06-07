import React from 'react';

const EmotionForm = ({ text, setText, handleSubmit }) => {
  return (
    <div className="form-section">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here..."
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default EmotionForm;
