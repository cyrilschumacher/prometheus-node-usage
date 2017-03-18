/// <reference types="mocha"/>
/// <reference types="node"/>

import * as chai from "chai";
import * as proxyquire from "proxyquire";


describe("getHeapUsed", () => {
    let stub: { getHeapUsed: Function };
    let processStub: {};

    before(() => {
        const createMetricStub = (metricName: string, value: any) => `${metricName} ${value}`;
        const stubs = { "../../builder/create": { createMetric: createMetricStub } };
        stub = proxyquire.load("../../../../src/metric/monitor/memory/getHeapUsed", stubs);

        processStub = {
            memoryUsage: () => {
                return { heapUsed: 1000 };
            },
        };
    });

    it("should return heap total without custom prefix", () => {
        const formatHeapUsed = (heapUsed: number) => heapUsed;
        const options = { prefix: "", formatters: { memory: { heapUsed: formatHeapUsed } } };
        const heapUsed = stub.getHeapUsed(options, processStub);

        chai.expect(heapUsed).to.be.equal("node_process_memory_used 1000");
    });

    it("should return heap total with custom prefix", () => {
        const formatHeapUsed = (heapUsed: number) => heapUsed;
        const options = { prefix: "test_", formatters: { memory: { heapUsed: formatHeapUsed } } };
        const heapUsed = stub.getHeapUsed(options, processStub);

        chai.expect(heapUsed).to.be.equal("test_node_process_memory_used 1000");
    });

    it("should return heap total with custom formatter", () => {
        const formatHeapUsed = (heapUsed: number) => heapUsed / 1000;
        const options = { prefix: "", formatters: { memory: { heapUsed: formatHeapUsed } } };
        const heapUsed = stub.getHeapUsed(options, processStub);

        chai.expect(heapUsed).to.be.equal("node_process_memory_used 1");
    });
});
