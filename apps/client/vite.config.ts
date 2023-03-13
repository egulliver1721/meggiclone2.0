import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // Allow connections from outside the container
    strictPort: true, // Throw an error if the port is already in use
    port: 5173, // The port to use
  }
});
