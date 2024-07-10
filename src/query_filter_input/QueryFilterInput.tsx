import React, { useEffect, useState, useRef, KeyboardEvent } from 'react';
import { Query, QueryFilterInputProps, Operators } from '../types';
import useKeyboardNavigation from './useKeyboardNavigation';
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
  const queryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleColumnSelect = (column: string) => {
    setSelectedColumn(column);
    const selectedColumnType = columns.find(c => c.name === column)?.type || 'string';
    const operator = operators[selectedColumnType][0]
    setOperator(operator);
    setOperatorInputValue(operator);
    setFilterValue('');
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
  };

  const handleOperatorSelect = (operator: string) => {
    setOperator(operator);
    setTimeout(() => {
      filterValueRef.current?.focus();
    }, 50);
  };

  const handleFilterValueSelect = (value: string) => {
    setFilterValue(value);
    addQuery({
      column: selectedColumn,
      operator,
      value: value,
    });
  };

  const handleFilterValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };

  const addQuery = ({
    column,
    operator,
    value,
  }: {
    column: string;
    operator: string;
    value: string;
  }) => {
    if (column && operator && value) {
      const newQuery: Query = { column, operator, value };
      const newQueries = [...queries, newQuery];
      setQueries(newQueries);
      onQueryChange(newQueries);
      resetForm();
      setTimeout(() => {
        columnInputRef.current?.focus();
      }, 10)
    }
  };

  const removeQuery = (index: number) => {
    const updatedQueries = queries.filter((_, i) => i !== index);
    setQueries(updatedQueries);
    onQueryChange(updatedQueries);

    setTimeout(() => {
      const queryIndex = queries.length - 2;
      if (queryRefs.current[queryIndex]) {
        queryRefs.current[queryIndex]?.focus();
      } else {
        columnInputRef.current?.focus();
      }
    }, 10);
  };

  const handleValueKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addQuery({
        column: selectedColumn,
        operator,
        value: filterValue,
      });
    }
  };

  useKeyboardNavigation({
    queries,
    removeQuery,
    inputRefs: [columnInputRef, operatorInputRef, filterValueRef],
    queryRefs: queryRefs.current,
    buttonRefs: buttonRefs.current,
  });

  useEffect(() => {
    queryRefs.current = queryRefs.current.slice(0, queries.length);
  }, [queries]);

  const selectedColumnType = columns.find(column => column.name === selectedColumn)?.type || 'string';
  const operatorOptions = operators[selectedColumnType];

  return (
    <div className="multi-select-container">
      <div className="chips">
        {queries.map((query, index) => (
          <div
            key={index}
            className="chip"
            ref={(el) => (queryRefs.current[index] = el)}
            tabIndex={0}
            data-type="query"
            data-query-index={index}
          >
            <span>{`${query.column} ${query.operator} ${query.value}`}</span>
            <button 
              ref={(el) => (buttonRefs.current[index] = el)}
              className="remove-btn"
              onClick={() => removeQuery(index)}
              data-type="remove"
              data-query-index={index}
            >&times;</button>
          </div>
        ))}
      </div>
      <AutocompleteDropdown
        inputValue={columnInputValue}
        setInputValue={setColumnInputValue}
        inputRef={columnInputRef}
        options={columns.map(column => column.name)}
        onSelect={handleColumnSelect}
        data-type="field"
      />
      {selectedColumn && (
        <AutocompleteDropdown
          searchable={false}
          inputValue={operatorInputValue}
          setInputValue={setOperatorInputValue}
          inputRef={operatorInputRef}
          options={operatorOptions}
          onSelect={handleOperatorSelect}
          data-type="field"
        />
      )}
      {operator && selectedColumn && (
        selectedColumnType === 'boolean' ? (
          <>
            <AutocompleteDropdown
              searchable={false}
              inputValue={filterValue}
              setInputValue={setFilterValue}
              inputRef={filterValueRef}
              options={['True', 'False']}
              onSelect={handleFilterValueSelect}
              inputStyle={{ width: '30px'}}
              data-type="field"
            />
          </>
        ) :
        <input
          className="multi-select-input"
          type={selectedColumnType === "string" ? "text" : selectedColumnType}
          ref={filterValueRef}
          value={filterValue}
          onChange={handleFilterValueChange}
          onKeyDown={handleValueKeyDown}
          placeholder="Enter value"
          data-type="field"
        />
      )}
      
    </div>
  );
};

export default QueryFilterInput;
