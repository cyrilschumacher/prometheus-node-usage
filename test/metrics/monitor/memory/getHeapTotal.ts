/// <reference types="mocha" />
/// <reference types="node" />

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
