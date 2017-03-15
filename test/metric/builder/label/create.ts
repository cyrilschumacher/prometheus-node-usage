/// <reference types="mocha"/>

import * as chai from "chai";
import { createMetricLabels } from "../../../../src/metric/builder/label/create";

describe("createMetricLabels", () => {
    it("should create metric labels", () => {
        const labels = [{ name: "method", value: "POST" }, { name: "handler", value: "/messages" }];
        const metricLabels = createMetricLabels(labels);
        chai.expect(metricLabels).to.be.equal("{method=\"POST\",handler=\"/messages\"}");
    });

    it("should create empty metric labels with empty value", () => {
        const labels = [{ name: "label", value: "" }];
        const metricLabels = createMetricLabels(labels);
        chai.expect(metricLabels).to.be.equal("{}");
    });

    it("should create empty metric labels with empty label", () => {
        const labels = [{ name: "", value: "value" }];
        const metricLabels = createMetricLabels(labels);
        chai.expect(metricLabels).to.be.equal("{}");
    });

    it("should create empty metric labels with empty labels", () => {
        const metricLabels = createMetricLabels.apply(void 0, []);
        chai.expect(metricLabels).to.be.empty;
    });
});
