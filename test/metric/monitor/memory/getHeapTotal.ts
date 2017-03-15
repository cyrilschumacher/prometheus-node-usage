/// <reference types="mocha"/>
/// <reference types="node"/>

import * as chai from "chai";
import * as proxyquire from "proxyquire";


describe("getHeapTotal", () => {
    let stub: { getHeapTotal: Function };
    let processStub: {};

    before(() => {
        const createMetricStub = (metricName: string, value: any) => `${metricName} ${value}`;
        const stubs = { "../../builder/create": { createMetric: createMetricStub } };
        stub = proxyquire.noCallThru().load("../../../../src/metric/monitor/memory/getHeapTotal", stubs);

        processStub = {
            memoryUsage: () => {
                return { heapTotal: 1000 };
            },
        };
    });

    it("should return heap total without custom prefix", () => {
        const formatHeapTotal = (heapTotal: number) => heapTotal;
        const options = { prefix: "", formatters: { memory: { heapTotal: formatHeapTotal } } };
        const heapTotal = stub.getHeapTotal(options, processStub);

        chai.expect(heapTotal).to.be.equal("node_process_memory_total 1000");
    });

    it("should return heap total with custom prefix", () => {
        const formatHeapTotal = (heapTotal: number) => heapTotal;
        const options = { prefix: "test_", formatters: { memory: { heapTotal: formatHeapTotal } } };
        const heapTotal = stub.getHeapTotal(options, processStub);

        chai.expect(heapTotal).to.be.equal("test_node_process_memory_total 1000");
    });

    it("should return heap total with custom formatter", () => {
        const formatHeapTotal = (heapTotal: number) => heapTotal / 1000;
        const options = { prefix: "", formatters: { memory: { heapTotal: formatHeapTotal } } };
        const heapTotal = stub.getHeapTotal(options, processStub);

        chai.expect(heapTotal).to.be.equal("node_process_memory_total 1");
    });
});
