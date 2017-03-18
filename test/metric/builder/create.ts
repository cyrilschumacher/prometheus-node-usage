/// <reference types="mocha"/>

import * as chai from "chai";
import * as proxyquire from "proxyquire";

describe("createMetricLabels", () => {
    it("should create metric", () => {
        const stub = proxyquire.load("../../../src/metric/builder/create", { "./label/create": { createMetricLabels: () => "" } });
        const metric = stub.createMetric("metric", "value", void 0);
        chai.expect(metric).to.be.equal("metric value");
    });

    it("should create metric with labels", () => {
        const stub = proxyquire.load("../../../src/metric/builder/create", { "./label/create": { createMetricLabels: () => "{label=\"value\"}" } });
        const metric = stub.createMetric("metric", "value");
        chai.expect(metric).to.be.equal("metric{label=\"value\"} value");
    });
});
