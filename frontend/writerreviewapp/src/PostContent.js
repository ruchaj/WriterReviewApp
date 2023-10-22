import React from 'react';
import { useState } from 'react';
const PostContent = ({ htmlContent, maxLength }) => {
    const [expanded, setExpanded] = useState(false);

    const contentToDisplay = expanded ? htmlContent : htmlContent.slice(0, maxLength);
  
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: contentToDisplay }} />
        {htmlContent.length > maxLength && (
          <button onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>
    );
  };

export default PostContent;
