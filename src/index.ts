import * as pidusage from "pidusage";

import { createMetricsAsync, GetMetricsReject, GetMetricsResolve } from "./metric/createMetricsAsync";

import { assertOptions } from "./options/assert";
import { getDefaultOptions } from "./options/getDefault";
import { normalizeOptions } from "./options/normalize";

export function getMetricsAsync(args?: Options) {
    const defaultOptions = getDefaultOptions();
    const options = normalizeOptions(args, defaultOptions);
    assertOptions(options);

    const executor = (resolve: GetMetricsResolve, reject: GetMetricsResolve) => createMetricsAsync(resolve, reject, options);
    return new Promise(executor);
}
