import Vue from 'vue';
import App from './App.vue';
import router from './router';
import {MdButton, MdApp, MdDrawer, MdToolbar, MdList, MdIcon, MdContent,
MdTabs, MdCard, MdRipple, MdAvatar, MdField, MdMenu, MdSnackbar,
MdProgress, MdCheckbox, MdDatepicker, MdDialog} from 'vue-material/dist/components';
import axios from 'axios';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default-dark.css';

Vue.config.productionTip = false;
Vue.use(MdButton);
Vue.use(MdApp);
Vue.use(MdDrawer);
Vue.use(MdToolbar);
Vue.use(MdList);
Vue.use(MdIcon);
Vue.use(MdContent);
Vue.use(MdTabs);
Vue.use(MdCard);
Vue.use(MdRipple);
Vue.use(MdAvatar);
Vue.use(MdField);
Vue.use(MdMenu);
Vue.use(MdSnackbar)
Vue.use(MdProgress);
Vue.use(MdCheckbox);
Vue.use(MdDatepicker);
Vue.use(MdDialog);

axios.defaults.headers.post['Content-Type'] = 'application/json';

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
