import * as _ from "lodash";
import { getDefaultOptions } from "./getDefault";

export function normalizeOptions(options?: {}, defaultOptions?: {}) {
    return _.merge(defaultOptions, options);
}
