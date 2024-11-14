import {useConfig} from "@/hooks/useConfig.mjs";
import {$Q} from "@/dom-bili/utils.mjs";
import {watch} from "vue";

export function useIsShowPlaceholder() {
    const isShowPlaceholder = useConfig('isClearPlaceholder', false);

    let placeholder = $Q('.nav-search-content > input').placeholder;

    watch(isShowPlaceholder, () => {
        if (isShowPlaceholder.value) {
            $Q('.nav-search-content > input').placeholder = placeholder;
        } else {

            $Q('.nav-search-content > input').placeholder = '';
        }
    }, {immediate: true});

    return isShowPlaceholder;
}