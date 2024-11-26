import {useConfig} from "@/hooks/useConfig.mjs";
import {watch} from "vue";
import {queryAsync} from "@/dom-bili/queryAsync.mjs";

export function useStyle(key, defaultValue, selector, styleKey, value) {
    const config = useConfig(key, defaultValue);

    queryAsync(selector).then((ele) => {
        watch(config, () => {
            if (config.value) {
                ele.style[styleKey] = value;
            } else {
                ele.style[styleKey] = "";
            }
        }, {immediate: true});
    }).catch(msg => {
        console.error(msg);
    });

    return config;
}