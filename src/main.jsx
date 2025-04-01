import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Landingpage from './landingpage'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
    <Landingpage/>
    </>
  </StrictMode>,
)
