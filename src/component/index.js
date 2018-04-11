import Label from './Label.vue';
import Route from './Route.vue';

const register = (Vue) => {
    Vue.component('Label', Label);
    Vue.component('Route', Route);
};

export default register;
