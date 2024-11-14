import {useCssVar} from "./useCssVar.mjs";
import {ref, watch} from "vue";

// 当用数值赋给cssVarFormat的时候会自动添加单位, 但当新值是字符串的时候将不做处理
export function useCssVarFormat(varName, defaultValue, format) {
    const cssVar = useCssVar(varName, defaultValue);

    let initValue = parseInt(cssVar.value);

    if (Object.is(initValue, NaN)) {
        // cssVar 值为center或...
        initValue = cssVar.value;
    }

    const cssVarFormat = ref(initValue);

    watch(cssVarFormat, () => {
        if (typeof cssVarFormat.value === "number") {
            cssVar.value = cssVarFormat.value + format;

        } else if (cssVarFormat.value === null) {
            cssVar.value = 0;
        } else if (typeof cssVarFormat.value === "string") {
            cssVar.value = cssVarFormat.value;
        }
    });


    return cssVarFormat;
}