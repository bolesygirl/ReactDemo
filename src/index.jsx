import React from 'react';
import { createRoot } from 'react-dom/client';


export const Index = () => {
  return (
    <h1>Welcome</h1>
  );
};

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);

root.render(<Index />);