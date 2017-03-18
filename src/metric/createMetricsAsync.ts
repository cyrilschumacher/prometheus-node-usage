/* The MIT License (MIT)
 *
 * Copyright (c) 2017 Cyril Schumacher
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import * as pidusage from "pidusage";

import { getStatAsync } from "./getStatAsync";
import { getCpuUsage } from "./monitor/getCpuUsage";
import { getUptime } from "./monitor/getUptime";
import { getHeapTotal } from "./monitor/memory/getHeapTotal";
import { getHeapUsed } from "./monitor/memory/getHeapUsed";
import { getResidentSetSize } from "./monitor/memory/getResidentSetSize";

export type GetMetricsResolve = (result: string) => void;
export type GetMetricsReject = (error: any) => void;

/**
 * Create Prometheus metrics on current process.
 *
 * @param {GetMetricsResolve}   resolve A resolver function.
 * @param {Options}             options Options.
 */
export async function createMetricsAsync(resolve: GetMetricsResolve, options: Options) {
    const stat = await getStatAsync(process.pid);
    let metrics: string[] = [];
    const heapUsedMetric = getHeapUsed(options);
    metrics.push(heapUsedMetric);

    const heapTotalMetric = getHeapTotal(options);
    metrics.push(heapTotalMetric);

    const residentSetSizeMetric = getResidentSetSize(options);
    metrics.push(residentSetSizeMetric);

    const cpuUsageMetric = getCpuUsage(options, stat);
    metrics.push(cpuUsageMetric);

    const uptimeMetric = getUptime(options);
    metrics.push(uptimeMetric);

    const formattedMetrics = metrics.join("\n");
    const result = `${formattedMetrics}\n`;
    resolve(result);
}
