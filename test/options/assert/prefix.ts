/// <reference types="mocha"/>

import * as chai from "chai";
import { assertPrefix } from "../../../src/options/assert/prefix";

describe("assertPrefix", () => {
    it("should not throw an exception with valid metric name", () => {
        const fn = () => assertPrefix("test", "metric_name");
        chai.expect(fn).to.not.throw(TypeError);
    });

    it("should throw an exception with invalid metric name", () => {
        const fn = () => assertPrefix("test", "metric/name");
        chai.expect(fn).to.throw(TypeError);
    });

    it("should throw an exception with empty metric name", () => {
        const fn = () => assertPrefix("test", "");
        chai.expect(fn).to.throw(ReferenceError);
    });

    it("should throw an exception with undefined metric name", () => {
        const fn = () => assertPrefix("test", void 0);
        chai.expect(fn).to.throw(ReferenceError);
    });
});
