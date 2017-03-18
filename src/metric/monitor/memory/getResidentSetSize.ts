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

/**
 * Creates a metric from resident set size (RSS) memory.
 *
 * @param {Options} options         Options.
 * @param {process} currentProcess  A current process.
 * @return {string} The metric.
 */
export function getResidentSetSize(options: Options, currentProcess = process) {
    const memoryUsage = currentProcess.memoryUsage();
    const residentSetSize = options.formatters!.memory!.residentSetSize!(memoryUsage.rss);
    const residentSetSizeMetricName = `${options.prefix}node_process_memory_rss`;

    return createMetric(residentSetSizeMetricName, residentSetSize);
}
