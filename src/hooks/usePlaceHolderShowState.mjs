import {useConfig} from "@/hooks/useConfig.mjs";

import {watch} from "vue";
import {queryAsync} from "@/dom-bili/queryAsync.mjs";

export function usePlaceHolderShowSate(inputSelector) {
    const isShowPlaceHolder = useConfig('isClearPlaceholder', false);

    queryAsync(inputSelector).then(inputEl => {
        let placeholder =inputEl.placeholder;

        watch(isShowPlaceHolder, () => {
            if (isShowPlaceHolder.value) {
                inputEl.placeholder = placeholder;
            } else {
                inputEl.placeholder = '';
            }
        }, {immediate: true});
    }).catch(err => console.error(err));


    return isShowPlaceHolder;
}