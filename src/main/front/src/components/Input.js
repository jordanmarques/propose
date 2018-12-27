import React from 'react';

const Input = ({onChange, value, name, placeholder}) => {
    return (
        <div>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">{name}</span>
                </div>
                <input type="text"
                       className="form-control"
                       value={value}
                       placeholder={placeholder}
                       onChange={e => onChange(e.target.value)}/>
            </div>
        </div>
    );
};

export default Input;
