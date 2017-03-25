/// <reference types="mocha" />
/// <reference types="node" />

import * as chai from "chai";
import * as process from "process";
import * as sinon from "sinon";

import { createMetricLabels } from "../../../../src/metrics/builder/label/create";

describe("createMetricLabels()", () => {
    it("should return metric labels", () => {
        const labels = [{name: "label1", value: "value1"}, {name: "label2", value: "value2"}];
        const metricLabels = createMetricLabels(labels);

        chai.expect(metricLabels).to.be.equal("{label1=\"value1\",label2=\"value2\"}");
    });

    it("should return empty string", () => {
        const metricLabels = createMetricLabels([]);
        chai.expect(metricLabels).to.be.equal("");
    });

    it("should return empty string with empty label name", () => {
        const labels = [{name: "", value: "value1"}];
        const metricLabels = createMetricLabels(labels);

        chai.expect(metricLabels).to.be.equal("{}");
    });

    it("should return empty string with empty label name", () => {
        const labels = [{name: "label1", value: ""}];
        const metricLabels = createMetricLabels(labels);

        chai.expect(metricLabels).to.be.equal("{}");
    });
});
