import {useConfig} from "@/hooks/useConfig.mjs";

import {watch} from "vue";
import {queryAsync} from "@/dom-bili/queryAsync.mjs";

export function useSearchBar(inputSelector) {
    const isShowPlaceHolder = useConfig('isClearPlaceholder', false);
    const isAutoFocus = useConfig('isAutoFocus', false);

    queryAsync(inputSelector).then(inputEl => {
        let timerId = setInterval(() => {
            let placeholder = inputEl.placeholder;

            if (placeholder === '') {
                return;
            } else {
                clearInterval(timerId);
            }

            watch(isShowPlaceHolder, () => {
                if (isShowPlaceHolder.value) {
                    inputEl.placeholder = placeholder;
                } else {
                    inputEl.placeholder = '';
                }
            }, {immediate: true});

            if (isAutoFocus.value) {
                inputEl.focus();
            }
        }, 200);
    }).catch(err => console.error(err));


    return {isShowPlaceHolder: isShowPlaceHolder, isAutoFocus};
}