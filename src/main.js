import { createApp } from 'vue';
import App from './App.vue';

import { ToastContainer, toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import './assets/style.css'



// createApp(App).mount('#app')

const app = createApp(App);

// Registrar el componente ToastContainer globalmente
app.component('ToastContainer', ToastContainer);

// Montar la aplicación
app.mount('#app');

// Puedes exportar `toast` para usar en otros componentes
export { toast };

// Añadir fondo degradado global con azul pastel
document.body.classList.add('bg-gradient-to-r', 'from-sky-200', 'to-blue-400');


