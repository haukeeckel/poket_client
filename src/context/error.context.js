import { createContext, useState } from 'react';

const ErrorContext = createContext();

function ErrorProviderWrapper(props) {
  const [errors, setErrors] = useState(null);

  return (
    <ErrorContext.Provider value={{ errors, setErrors }}>
      {props.children}
    </ErrorContext.Provider>
  );
}

export { ErrorContext, ErrorProviderWrapper };
