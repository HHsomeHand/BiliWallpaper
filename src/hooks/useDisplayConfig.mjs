import { useConfig } from "./useConfig.mjs";
import {applyDisplayState} from "@/dom-bili/utils.mjs";
import {ref, watch} from 'vue'

export function useDisplayConfig(key, defaultValue, query) {
  const config = useConfig(key, defaultValue);

  watch(config, () => {
    applyDisplayState([query], config.value);
  }, {immediate: true});

  return config
}