import Vue from 'vue';
import { shallow } from '@vue/test-utils';
import { createRenderer } from 'vue-server-renderer';
import vueRouter from 'vue-router'

import App from '../src/App.vue'

describe('App.vue', () => {
    it('renders correctly', () => {
        Vue.use(vueRouter)
        const wrapper = shallow(App);
        expect(wrapper).toBeDefined();
    });

});