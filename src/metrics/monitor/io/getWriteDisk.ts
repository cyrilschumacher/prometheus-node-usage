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
import { getDiskStat } from "./getDiskStat";

const DefaultFormatter = (value: string) => "" + value;

/**
 * Creates a metric from CPU usage.
 *
 * @param {Process}     [currentProcess]    A current process.
 * @param {string}      [name]              A metric name.
 * @param {Function}    [formatter]         A formatter.
 * @return {string} The metric.
 */
export async function getWriteDisk(currentProcess = process, name = "node_process_disk_io_write", formatter = DefaultFormatter) {
    const disk = await getDiskStat(process.pid);
    const writeBytes = formatter(disk.write_bytes);

    return createMetric(name, writeBytes);
}
