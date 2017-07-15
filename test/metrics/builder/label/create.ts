/* The MIT License (MIT)
 *
 * Copyright (c) 2017 Cyril Schumacher
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
