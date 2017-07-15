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

import * as chai from "chai";
import * as process from "process";
import * as sinon from "sinon";

import { getHeapTotal } from "../../../../src/metrics/monitor/memory/getHeapTotal";

describe("getHeapTotal()", () => {
    let memoryUsageStub: sinon.SinonStub;

    before(() => {
        memoryUsageStub = sinon.stub(process, "memoryUsage");
        memoryUsageStub.returns({ heapTotal: 1 });
    });

    after(() => {
        sinon.restore(memoryUsageStub);
    });

    it("should return heap total metric", () => {
        const uptime = getHeapTotal(process);
        chai.expect(uptime).to.be.equal("node_process_memory_heap_total 1");
    });

    it("should return heap total metric with custom name", () => {
        const uptime = getHeapTotal(process, "test");
        chai.expect(uptime).to.be.equal("test 1");
    });
});
