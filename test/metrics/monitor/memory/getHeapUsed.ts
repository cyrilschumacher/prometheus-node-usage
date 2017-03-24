/// <reference types="mocha" />
/// <reference types="node" />

import * as chai from "chai";
import * as process from "process";
import * as sinon from "sinon";

import { getHeapUsed } from "../../../../src/metrics/monitor/memory/getHeapUsed";

describe("getHeapTotal()", () => {
    let memoryUsageStub: sinon.SinonStub;

    before(() => {
        memoryUsageStub = sinon.stub(process, "memoryUsage");
        memoryUsageStub.returns({ heapUsed: 1 });
    });

    after(() => {
        sinon.restore(memoryUsageStub);
    });

    it("should return heap total metric", () => {
        const heapUsed = getHeapUsed(process);
        chai.expect(heapUsed).to.be.equal("node_process_memory_heap_used 1");
    });

    it("should return heap total metric with custom name", () => {
        const heapUsed = getHeapUsed(process, "test");
        chai.expect(heapUsed).to.be.equal("test 1");
    });
});
