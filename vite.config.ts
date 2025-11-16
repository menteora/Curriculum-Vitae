import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const commonConfig = {
    plugins: [react()],
  };

  if (mode === 'lib') {
    return {
      ...commonConfig,
      build: {
        lib: {
          entry: path.resolve(__dirname, 'lib.ts'),
          name: 'ScrumDashboardLibrary',
          fileName: (format) => `scrum-dashboard-library.${format}.js`,
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
      },
    };
  }
  
  return {
    ...commonConfig,
    base: '/il-tuopath/', 
  };
});
