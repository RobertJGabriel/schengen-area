import Vue from 'vue';
import App from './components/app.vue';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import 'material-icons/iconfont/material-icons.css';

Vue.config.productionTip = false;

import {
  MdSwitch,
  MdCard,
  MdToolbar,
  MdSubheader,
  MdIcon,
  MdDivider,
  MdList,
  MdField,
  MdTooltip,
  MdSnackbar,
  MdMenu,
  MdApp,
  MdDrawer,
  MdButton,
  MdContent,
  MdDatepicker,
  MdDialog,
  MdTable,
  MdEmptyState,
  MdRipple,
} from 'vue-material/dist/components';


Vue.use(MdSwitch);
Vue.use(MdToolbar);
Vue.use(MdSubheader);
Vue.use(MdIcon);
Vue.use(MdDivider);
Vue.use(MdList);
Vue.use(MdCard);
Vue.use(MdField);
Vue.use(MdTooltip);
Vue.use(MdSnackbar);
Vue.use(MdMenu);
Vue.use(MdApp);
Vue.use(MdDrawer);
Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdDatepicker);
Vue.use(MdDialog);
Vue.use(MdTable);
Vue.use(MdEmptyState);
Vue.use(MdRipple);
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
});
