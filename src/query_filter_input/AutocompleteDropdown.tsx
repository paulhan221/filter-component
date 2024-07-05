import React, { useState, useEffect, useRef, useMemo, ChangeEvent, KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';

interface AutocompleteDropdownProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  options: string[];
  onSelect: (value: string) => void;
  inputStyle?: React.CSSProperties;
  searchable?: boolean;
}

const AutocompleteDropdown: React.FC<AutocompleteDropdownProps> = ({
  searchable = true,
  inputValue,
  setInputValue,
  inputRef,
  options,
  onSelect,
  inputStyle = {},
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    // setFilteredOptions(options.filter(option => option.toLowerCase().includes(value.toLowerCase())));
    setShowDropdown(true);
    setHighlightedIndex(0);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // console.log('handleKeyDown')
    const selectedOption = filteredOptions[highlightedIndex];
    if (event.key === 'Enter') {
      if (showDropdown) {
        if (selectedOption) {
          setInputValue(selectedOption);
          setShowDropdown(false);
          onSelect(selectedOption);
          setHighlightedIndex(0);
        }
      }
    } else if (event.key === 'ArrowDown') {
      setShowDropdown(true);
      setHighlightedIndex((prevIndex) => (prevIndex + 1) % filteredOptions.length);
    } else if (event.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => (prevIndex - 1 + filteredOptions.length) % filteredOptions.length);
    } else if (event.key === 'Escape') {
      setShowDropdown(false);
    } else if (event.key === 'Tab') {
      console.log('tabby')
      if (showDropdown && !event.shiftKey) {
        if (selectedOption) {
          setInputValue(selectedOption);
          setShowDropdown(false);
          onSelect(selectedOption);
        }
      }
    } else if (event.key === 'Backspace') {
      onSelect('');
    }
  };

  const handleOptionSelect = (option: string) => {
    setInputValue(option);
    setShowDropdown(false);
    onSelect(option);
    setHighlightedIndex(0);
  };

  const handleFocus = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPosition({ top: rect.bottom + 8, left: rect.left });
    }
    setShowDropdown(true);
  }
  // const filteredOptions = options.filter(option => option.toLowerCase().includes(inputValue.toLowerCase()));
  // console.log('filteredOptions',filteredOptions)
  const filteredOptions = useMemo(() => {
    if (searchable) {
      return options.filter(option => option.toLowerCase().includes(inputValue.toLowerCase()));
    } else {
      return options;
    }
  }, [options, inputValue, searchable]);
  
  return (
    <div className="autocomplete-dropdown">
      <input
        className="multi-select-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={() => setShowDropdown(false)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        style={{
          ...inputStyle,
          width: `${inputValue.length * 10}px`,
        }}
      />
      {showDropdown && filteredOptions?.length > 0 &&  createPortal(
        <div
          className="dropdown"
          ref={dropdownRef}
          style={dropdownPosition}
        >
          {filteredOptions.map((option, index) => (
            <div
              key={option}
              className={`dropdown-item ${highlightedIndex === index ? 'highlighted' : ''}`}
              onMouseDown={() => handleOptionSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
};

export default AutocompleteDropdown;
