import {useConfig} from "@/hooks/useConfig.mjs";
import {$Q_Async} from "@/dom-bili/utils.mjs";
import {watch} from "vue";

export function useConfigStyle(key, defaultValue, selector, styleKey, value) {
    const config = useConfig(key, defaultValue);

    $Q_Async(selector).then((ele) => {
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