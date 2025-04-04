import React from 'react';
import Div100vh from 'react-div-100vh';
import { ErrorBoundary as ErrorBoundaryComponent } from 'react-error-boundary';

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundaryComponent
      fallbackRender={() => {
        return (
          <Div100vh>
            <>networkErr</>
          </Div100vh>
        );
      }}
    >
      {children}
    </ErrorBoundaryComponent>
  );
};

export default ErrorBoundary;
