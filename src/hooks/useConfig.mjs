import { GM_getValue, GM_setValue } from '$'
import { ref, watch } from 'vue'

// 类似于ref, 但会自动GM_setValue保存值
export function useConfig(key, defaultValue) {
  const isObjOrArr = (typeof defaultValue === 'object' || Array.isArray(defaultValue));

  let storeValue = GM_getValue(key, defaultValue);

  if (isObjOrArr) {
    if (storeValue !== defaultValue) {
      // JSON.parse({}) 会报错
      storeValue = JSON.parse(storeValue);
    }

    if (storeValue === null) {
      storeValue = defaultValue;
    }
  } 

  const config = ref(storeValue);

  watch(config, () => {
    if (isObjOrArr) {
      // GM_setValue 无法直接保存Object, 得先转成JSON
      let jsonString = JSON.stringify(config.value);
      GM_setValue(key, jsonString);
    } else {
      GM_setValue(key, config.value);
    }
  }, {deep: true});

  return config;
}