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

import { createMetric } from "../../builder/create";
import { getStatAsync } from "./getStatAsync";

/**
 * Default formatter.
 *
 * @param {number} value A CPU usage.
 * @return {string} The original CPU usage.
 */
const DefaultFormatter = (value: number) => "" + value;

/**
 * Creates a metric from CPU usage.
 *
 * @param {Process}     [currentProcess]    A current process.
 * @param {string}      [name]              A metric name.
 * @param {Function}    [formatter]         A formatter.
 * @return {string} The metric.
 */
export async function getCpuUsage(currentProcess = process, name = "node_process_cpu_usage", formatter = DefaultFormatter) {
    const stat = await getStatAsync(currentProcess.pid);
    const cpuUsage = formatter(stat.cpu);

    return createMetric(name, cpuUsage);
}
