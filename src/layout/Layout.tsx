import { use100vh } from 'react-div-100vh';
import './Layout.scss';
import React from 'react';

interface IProps {
    children?: React.ReactNode;
  }
  
  const Layout = (props: IProps) => {
    const { children } = props;
    const height = use100vh() as number;
    return (
      <section className="layout">
        <section
          className="layout__wrapper"
          style={{ height }}
        >
          {children}
        </section>
      </section>
    );
  };
  
  const LayoutMain = (props: IProps) => {
    const { children } = props;
    return <main className="layout__main">{children}</main>;
  };
  
  export { Layout,  LayoutMain };
  