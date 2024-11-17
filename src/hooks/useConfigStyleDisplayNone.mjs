import {useConfigStyle} from "@/hooks/useConfigStyle.mjs";

export function useConfigStyleDisplayNone(key, defaultValue, selector) {
    return useConfigStyle(key, defaultValue, selector, 'display', 'none');
}