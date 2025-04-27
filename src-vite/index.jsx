import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ContactForm } from "./components/screens/ContactForm";
import './globals.css';

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <ContactForm />
  </StrictMode>
);
