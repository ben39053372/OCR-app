import React from 'react';
import { renderRoutes } from 'react-router-config';

import { routes } from './routes';

function App() {
  return <>{renderRoutes(routes)}</>;
}

export default App;
