import React, { useState } from 'react';
import { diff_match_patch } from 'diff-match-patch';

const GrammarCheckComponent = () => {
  const url = 'https://grammarbot-neural.p.rapidapi.com/v1/check';
  const [inputText, setInputText] = useState('');
  const [grammarResults, setGrammarResults] = useState(null);
  const dmp = new diff_match_patch();

  const checkGrammar = async (text) => {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'a17a17f6c2msh09c2f55717b1bfcp1537fdjsn4995bf8f2ae1',
        'X-RapidAPI-Host': 'grammarbot-neural.p.rapidapi.com',
      },
      body: JSON.stringify({
        text: text,
        lang: 'en',
      }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setGrammarResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  const highlightChanges = (original, corrected) => {
    const diffs = dmp.diff_main(original, corrected);
    dmp.diff_cleanupSemantic(diffs);
    const diffsWithMarkup = diffs.map((part) => {
      if (part[0] === -1) {
        return `<del>${part[1]}</del>`;
      } else if (part[0] === 1) {
        return `<ins>${part[1]}</ins>`;
      } else {
        return part[1];
      }
    });
    return diffsWithMarkup.join('');
  };

  return (
    <div>
      <div>
        <textarea
          placeholder="Enter text to check grammar..."
          rows="4"
          cols="50"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div>
          <button className="text-center" onClick={() => checkGrammar(inputText)}>
            Check Grammar
          </button>
        </div>
      </div>
      {grammarResults && (
        <div>
          <h2>Grammar Correction:</h2>
          <div className="correction-box">
            <div>Changes made: </div>
            <div
              dangerouslySetInnerHTML={{
                __html: highlightChanges(inputText, grammarResults.correction),
              }}
            />
          </div>
          <div>Corrected text:</div>
          <div dangerouslySetInnerHTML={{ __html: grammarResults.correction }} />
        </div>
      )}
    </div>
  );
};

export default GrammarCheckComponent;
