import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@import "@/styles/variables";',
			},
		},
	},
	plugins: [vue()],
	resolve: {
		alias: [{
			find: '@',
			replacement: path.resolve(__dirname, './src'),
		}],
	},
});
