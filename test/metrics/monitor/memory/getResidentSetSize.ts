/// <reference types="mocha" />
/// <reference types="node" />

import * as chai from "chai";
import * as process from "process";
import * as sinon from "sinon";

import { getResidentSetSize } from "../../../../src/metrics/monitor/memory/getResidentSetSize";

describe("getResidentSetSize()", () => {
    let memoryUsageStub: sinon.SinonStub;

    before(() => {
        memoryUsageStub = sinon.stub(process, "memoryUsage");
        memoryUsageStub.returns({ rss: 1 });
    });

    after(() => {
        sinon.restore(memoryUsageStub);
    });

    it("should return heap total metric", () => {
        const rss = getResidentSetSize(process);
        chai.expect(rss).to.be.equal("node_process_memory_rss 1");
    });

    it("should return heap total metric with custom name", () => {
        const rss = getResidentSetSize(process, "test");
        chai.expect(rss).to.be.equal("test 1");
    });
});
