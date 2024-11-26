import {useStyle} from "@/hooks/useStyle.mjs";

export function useDisplayNone(key, defaultValue, selector) {
    return useStyle(key, defaultValue, selector, 'display', 'none');
}