import React, { useRef, useState } from 'react';
import { StyledSearchSelect } from './style';
import { ErrorMessage, Field } from 'formik';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { StyledFieldErrorMessage, StyledFormLabel } from 'styles/global';

const SearchSelect = ({ name, label, options, placeholder, formik, ...rest }) => {
    const dropdownRef = useRef(null);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(options);
    const [customInputValue, setCustomInputValue] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const searchList = (event) => {
        const query = event.target.value;
        setQuery(query);
        const filteredResults = filterMethod(options, query);
        setResults(filteredResults);
    };

    const handleAddName = () => {
        if (customInputValue.trim() !== '') {
            setResults([...results, customInputValue.trim()]);
            setCustomInputValue('');
        }
    };

    const filterMethod = (options, query) => {
        return options.filter(option => option.toLowerCase().includes(query.toLowerCase()));
    };

    const handleBlur = () => {
        setTimeout(() => {
            if (!dropdownRef.current.contains(document.activeElement)) {
                setDropdownVisible(false);
            }
        }, 200);
    };

    return (
        <React.Fragment>
            <StyledSearchSelect
                ref={dropdownRef}
                error={formik.errors[name] && formik.touched[name]}
            >
                <StyledFormLabel>{label}</StyledFormLabel>
                <Field name={name}>
                    {({ field }) => (
                        <React.Fragment>
                            <div className='searchSelect_input'>
                                <SearchOutlinedIcon sx={{ color: '#888888' }} />
                                <input
                                    type="text"
                                    value={query}
                                    onBlur={handleBlur}
                                    onChange={searchList}
                                    placeholder={placeholder}
                                    onFocus={() => setDropdownVisible(true)}
                                />
                            </div>
                            {dropdownVisible && (
                                <div className="searchSelect_dropdown">
                                    <ul className="searchSelect_dropdown_list">
                                        {results.map(result => (
                                            <li
                                                key={result}
                                                onClick={() => {
                                                    handleBlur()
                                                    setQuery(result)
                                                    formik.setFieldValue(name, result)
                                                }}
                                            >
                                                {result}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="searchSelect_dropdown_custom-input">
                                        {!results.length && <p className='no-data'>Data not found</p>}
                                        <div>
                                            <input
                                                type="text"
                                                value={customInputValue}
                                                placeholder="Enter here"
                                                onChange={(e) => { setCustomInputValue(e.target.value) }}
                                            />
                                            <button type='button' onClick={handleAddName}>+Add name</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    )}
                </Field>
            </StyledSearchSelect>
            <ErrorMessage name={name} component={StyledFieldErrorMessage} />
        </React.Fragment>
    );
};


export default SearchSelect;