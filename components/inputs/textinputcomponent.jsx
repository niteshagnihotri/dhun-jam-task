import React from 'react';

const TextInputComponent = ({
  label = '',
  name = '',
  register = () => {},
  errors,
  placeholder = '',
  defaultVal,
  type = "text",
  required = false,
  options = {},
  className = '',
  isLabelVisible = true,
  ...props
}) => {

  return (
    <div>
      <label
        htmlFor={name}
        className={`mb-1 text-sm ${
          isLabelVisible ? 'block' : 'hidden'
        }`}
      >
        {label}
      </label>

      <div>
        {type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            {...register(name, {
              required: required ? `${label} is required` : false,
              ...options,
            })}
            placeholder={`${placeholder}`}
            className={`block w-full rounded-lg px-2.5 py-2 pl-5 font-light border focus:outline-none ${className} `}
            rows={3}
            autoComplete={'off'}
            {...props}
          />
        ) : (
          <input
            id={name}
            name={name}
            {...register(name, {
              required: required ? `${label} is required` : false,
              ...options,
            })}
            type={type}
            placeholder={`${placeholder}`}
            defaultValue={defaultVal}
            className={`w-full rounded-xl bg-transparent border border-slate-200 px-2 text-xs py-3 disabled:border-grey disabled:text-grey ${className}`}
            autoComplete={'off'}
            {...props}
          />
        )}
      </div>
      {errors[name] && (
        <p className="mt-0.5 text-xs text-red-500">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default TextInputComponent;
