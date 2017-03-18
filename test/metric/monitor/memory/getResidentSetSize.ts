/// <reference types="mocha"/>
/// <reference types="node"/>

import * as chai from "chai";
import * as proxyquire from "proxyquire";


describe("getResidentSetSize", () => {
    let stub: { getResidentSetSize: Function };
    let processStub: {};

    before(() => {
        const createMetricStub = (metricName: string, value: any) => `${metricName} ${value}`;
        const stubs = { "../../builder/create": { createMetric: createMetricStub } };
        stub = proxyquire.load("../../../../src/metric/monitor/memory/getResidentSetSize", stubs);

        processStub = {
            memoryUsage: () => {
                return { rss: 1000 };
            },
        };
    });

    it("should return heap total without custom prefix", () => {
        const formatResidentSetSize = (residentSetSize: number) => residentSetSize;
        const options = { prefix: "", formatters: { memory: { residentSetSize: formatResidentSetSize } } };
        const residentSetSize = stub.getResidentSetSize(options, processStub);

        chai.expect(residentSetSize).to.be.equal("node_process_memory_rss 1000");
    });

    it("should return heap total with custom prefix", () => {
        const formatResidentSetSize = (residentSetSize: number) => residentSetSize;
        const options = { prefix: "test_", formatters: { memory: { residentSetSize: formatResidentSetSize } } };
        const residentSetSize = stub.getResidentSetSize(options, processStub);

        chai.expect(residentSetSize).to.be.equal("test_node_process_memory_rss 1000");
    });

    it("should return heap total with custom formatter", () => {
        const formatResidentSetSize = (residentSetSize: number) => residentSetSize / 1000;
        const options = { prefix: "", formatters: { memory: { residentSetSize: formatResidentSetSize } } };
        const residentSetSize = stub.getResidentSetSize(options, processStub);

        chai.expect(residentSetSize).to.be.equal("node_process_memory_rss 1");
    });
});
