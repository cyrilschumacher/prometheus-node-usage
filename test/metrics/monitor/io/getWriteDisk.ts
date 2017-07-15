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
import * as sinon from "sinon";

import * as metric from "../../../../src/metrics/builder/create";
import * as io from "../../../../src/metrics/monitor/io/getDiskStat";

import { getWriteDisk } from "../../../../src/metrics/monitor/io/getWriteDisk";

describe("getWriteDisk", () => {
    let createMetricStub: sinon.SinonStub;
    let getDiskStatStub: sinon.SinonStub;
    let processPidStub: sinon.SinonStub;

    beforeEach(() => {
        createMetricStub = sinon.stub(metric, "createMetric");
        getDiskStatStub = sinon.stub(io, "getDiskStat");
        processPidStub = sinon.stub(process, "pid");
    });
    afterEach(() => {
        createMetricStub.restore();
        getDiskStatStub.restore();
        processPidStub.restore();
    });

    it("should return metric", async () => {
        // Given
        processPidStub.returns(1);
        getDiskStatStub.callsFake(() => Promise.resolve({ write_bytes: "write_bytes" }));
        createMetricStub.withArgs("node_process_disk_io_write", "write_bytes").returns("metric");

        // When
        const metrics = await getWriteDisk();

        // Then
        chai.expect(metrics).to.be.a("string").and.to.be.equal("metric");
    });

    it("shoud return formatted metric", async () => {
        // Given
        processPidStub.returns(1);
        getDiskStatStub.callsFake(() => Promise.resolve({ write_bytes: "write_bytes" }));
        createMetricStub.withArgs("node_process_disk_io_write", "formatted").returns("metric");

        // When
        const metrics = await getWriteDisk(process, "node_process_disk_io_write", (value: string) => "formatted");

        // Then
        chai.expect(metrics).to.be.a("string").and.to.be.equal("metric");
    });

    it("shoud use custom name", async () => {
        // Given
        processPidStub.returns(1);
        getDiskStatStub.callsFake(() => Promise.resolve({ write_bytes: "write_bytes" }));
        createMetricStub.withArgs("test", "write_bytes").returns("metric");

        // When
        const metrics = await getWriteDisk(process, "test");

        // Then
        chai.expect(metrics).to.be.a("string").and.to.be.equal("metric");
    });
});
