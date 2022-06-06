import { createSwatch } from "styman/dist/tsc/dynamic";
import {
  buildDefaultStyler,
  createStyler,
  defaultColorScheme,
} from "styman/styler";

export const css = createStyler({
  colors: {
    ...defaultColorScheme,
    primary: createSwatch("#172C3D"),
  },
  build: buildDefaultStyler,
});
