/// <reference types="mocha" />
/// <reference types="node" />

import * as chai from "chai";
import * as process from "process";
import * as sinon from "sinon";

import { createMetric } from "../../../../src/metrics/monitor/builder/create";

describe("createMetricLabels()", () => {
    it("should create metric", () => {
        const metricLabels = createMetric("metric1", "value1");
        chai.expect(metricLabels).to.be.equal("metric1 value1");
    });

    it("should create metric with labels", () => {
        const metricLabels = createMetric("metric1", "value1", { name: "method", value: "POST" }, { name: "handler", value: "/messages" });
        chai.expect(metricLabels).to.be.equal("metric1{method=\"POST\",handler=\"/messages\"} value1");
    });
});