import {ref, watch} from 'vue'
import {useConfig} from "@/hooks/useConfig.mjs";

export function useCssVar(varName, defaultValue) {
    let cssVar = useConfig(varName, defaultValue);

    watch(cssVar, () => {
        document.documentElement.style.setProperty(varName, cssVar.value);
    }, {immediate: true});

    return cssVar;
}