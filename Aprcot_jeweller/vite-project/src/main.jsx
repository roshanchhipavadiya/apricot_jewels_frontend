import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store.jsx'
import { BrowserRouter } from 'react-router-dom'
// At the top of main.jsx (Vite project)
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
