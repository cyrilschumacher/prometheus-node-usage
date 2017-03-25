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

import { getCpuUsage } from "./monitor/cpu/getCpuUsage";
import { getUptime } from "./monitor/getUptime";
import { getReadDisk } from "./monitor/io/getReadDisk";
import { getWriteDisk } from "./monitor/io/getWriteDisk";
import { getHeapTotal } from "./monitor/memory/getHeapTotal";
import { getHeapUsed } from "./monitor/memory/getHeapUsed";
import { getResidentSetSize } from "./monitor/memory/getResidentSetSize";

/**
 * Create Prometheus metrics on current process.
 */
export async function createMetricsAsync() {
    let metrics: string[] = [];

    const monitors = [getHeapUsed, getHeapTotal, getResidentSetSize, getUptime];
    monitors.map((monitor) => monitor()).forEach((metric) => metrics.push(metric));

    const cpuUsageMetric = await getCpuUsage();
    metrics.push(cpuUsageMetric);

    if (process.platform === "linux") {
        const readDisk = await getReadDisk();
        metrics.push(readDisk);

        const writeDisk = await getWriteDisk();
        metrics.push(writeDisk);
    }

    const formattedMetrics = metrics.join("\n");
    return `${formattedMetrics}\n`;
}
