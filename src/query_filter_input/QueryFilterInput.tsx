import React, { useState, useRef, KeyboardEvent } from 'react';
import { Query, QueryFilterInputProps, Operators } from '../types';
import AutocompleteDropdown from './AutocompleteDropdown';
import './styles.scss';

const operators: Operators = {
  string: ['=', '!=', 'contains', 'starts with', 'ends with'],
  number: ['=', '!=', '>', '<', '>=', '<='],
  boolean: ['=', '!='],
  date: ['=', '!=', 'before', 'after'],
};

const QueryFilterInput: React.FC<QueryFilterInputProps> = ({ columns, onQueryChange }) => {
  const [columnInputValue, setColumnInputValue] = useState<string>('');
  const [operatorInputValue, setOperatorInputValue] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');

  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [operator, setOperator] = useState<string>('');
  const [queries, setQueries] = useState<Query[]>([]);

  const columnInputRef = useRef<HTMLInputElement>(null);
  const operatorInputRef = useRef<HTMLInputElement>(null);
  const filterValueRef = useRef<HTMLInputElement>(null);

  const handleColumnSelect = (column: string) => {
    setSelectedColumn(column);
    const selectedColumnType = columns.find(c => c.name === column)?.type || 'string';
    const operator = operators[selectedColumnType][0]
    setOperator(operator);
    setOperatorInputValue(operator);
    setTimeout(() => {
      operatorInputRef.current?.focus();
    }, 50);
  };

  const resetForm = () => {
    setColumnInputValue('');
    setOperatorInputValue('');
    setFilterValue('');

    setSelectedColumn('');
    setOperator('');
    setFilterValue('');
  };

  const handleOperatorSelect = (operator: string) => {
    setOperator(operator);
    setTimeout(() => {
      filterValueRef.current?.focus();
    }, 50);
  };

  const handleFilterValueSelect = (value: string) => {
    setFilterValue(value.toLowerCase());
  }

  const handleFilterValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };

  const addQuery = () => {
    if (selectedColumn && operator && filterValue) {
      const newQuery: Query = { column: selectedColumn, operator, value: filterValue };
      const newQueries = [...queries, newQuery];
      setQueries(newQueries);
      onQueryChange(newQueries);
      resetForm();
      setTimeout(() => {
        columnInputRef.current?.focus();
      }, 50)
    }
  };

  const removeQuery = (index: number) => {
    const updatedQueries = queries.filter((_, i) => i !== index);
    setQueries(updatedQueries);
    onQueryChange(updatedQueries);
  };

  const handleValueKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addQuery();
    }
  };

  const selectedColumnType = columns.find(column => column.name === selectedColumn)?.type || 'string';
  const operatorOptions = operators[selectedColumnType];

  console.log('selectedColumnType',selectedColumnType)
  console.log('operatorOptions',operatorOptions)
  return (
    <div className="multi-select-container">
      <div className="chips">
        {queries.map((query, index) => (
          <div key={index} className="tag">
            <span>{`${query.column} ${query.operator} ${query.value}`}</span>
            <button className="close-btn"  onClick={() => removeQuery(index)}>x</button>
          </div>
        ))}
      </div>
      <AutocompleteDropdown
        inputValue={columnInputValue}
        setInputValue={setColumnInputValue}
        inputRef={columnInputRef}
        options={columns.map(column => column.name)}
        onSelect={handleColumnSelect}
      />
      {selectedColumn && (
        <AutocompleteDropdown
          searchable={false}
          inputValue={operatorInputValue}
          setInputValue={setOperatorInputValue}
          inputRef={operatorInputRef}
          options={operatorOptions}
          onSelect={handleOperatorSelect}
          inputStyle={{ width: '20px'}}
        />
      )}
      {operator && selectedColumn && (
        selectedColumnType === 'boolean' ? (
          <AutocompleteDropdown
            searchable={false}
            inputValue={filterValue}
            setInputValue={setFilterValue}
            inputRef={filterValueRef}
            options={['True', 'False']}
            onSelect={handleFilterValueSelect}
            inputStyle={{ width: '30px'}}
          />
        ) :
        <input
          className="multi-select-input"
          type={selectedColumnType === "string" ? "text" : selectedColumnType}
          ref={filterValueRef}
          value={filterValue}
          onChange={handleFilterValueChange}
          onKeyDown={handleValueKeyDown}
          placeholder="Enter value"
        />
      )}
      
    </div>
  );
};

export default QueryFilterInput;
