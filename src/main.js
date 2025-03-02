import { createApp } from 'vue';
import { createPinia } from 'pinia'
import { GM_registerMenuCommand } from '$'

import App from './App.vue';

import './assets/css/bilibili.css'
import { useMainStore } from './store/main.mjs';
import { storeToRefs } from 'pinia';
import {queryAsync} from "@/dom-bili/queryAsync.mjs";

const pinia = createPinia();

const app = createApp(App).use(pinia)

const mainStore = useMainStore();
const {isShowDialog} = storeToRefs(mainStore);

GM_registerMenuCommand('设置 (点我切换背景图片)', () => {
  isShowDialog.value = true;
});

(async () => {
    let biliHeaderEl = await queryAsync('.bili-header');

    app.mount(
        (() => {
            const app = document.createElement('div');
            // let parent = document.body;
            let parent = biliHeaderEl;

            // 将新节点插入为第一个子节点
            if (parent.firstChild) {
                parent.insertBefore(app, parent.firstChild);
            } else {
                parent.appendChild(app); // 如果父节点没有子节点，直接添加
            }

            return app;
        })(),
    );
})();


