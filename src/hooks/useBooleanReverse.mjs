import {ref, watch} from 'vue'

export function useBooleanReverse(target) {
    const proxy = ref(target.value);

    watch(proxy, () => {
        target.value = !proxy.value;
    });

    return proxy;
}