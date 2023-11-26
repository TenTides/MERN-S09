import React, { useState } from 'react';
import './TagMenu.css';
import './global.css';

const TagMenu = ({ tags, onSelectTag }) => {
  const [selectedTags, setSelectedTags] = useState([]);


  const handleTagClick = (tag) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((selectedTag) => selectedTag !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newSelectedTags);
    onSelectTag(newSelectedTags);
  };

  return (
    <div className="tag-menu">
      <div className='header'>Your Tags</div>
      <ul>
        {tags
          .filter(tag => tag !== '')
          .map((tag) => (
          <li
            key={tag}
            className={selectedTags.includes(tag) ? 'selected' : ''}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagMenu;
