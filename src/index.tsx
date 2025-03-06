/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router'
import App from './App';

import './index.css';
import { lazy } from 'solid-js';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

const routes = [
  {
    path: '/',
    component: lazy(() => import('./App'))
  },
  {
    path: '/graphics',
    component: lazy(() => import('./routes/Graphics'))
  }
]

render(() => (
  <Router>
    {routes}
  </Router>
), root!);
