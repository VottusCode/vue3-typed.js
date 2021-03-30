import { VueTyped } from './components/Typed';
import { App } from 'vue';

const plugin = (app: App) => app.component('typed', VueTyped);

export { plugin, VueTyped };
