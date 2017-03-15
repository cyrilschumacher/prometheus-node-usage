/// <reference types="mocha"/>

import * as chai from "chai";
import { assertFormatter } from "../../../src/options/assert/formatter";

describe("assertFormatter", () => {
    it("should not throw an exception with valid formatter", () => {
        const formatter = (value: number) => "" + value;
        const fn = () => assertFormatter.call(void 0, "test", formatter);

        chai.expect(fn).to.not.throw(TypeError);
    });

    it("should throw an exception with invalid formatter", () => {
        const fn = () => assertFormatter.call(void 0, "test", "formatter");
        chai.expect(fn).to.throw(TypeError);
    });

    it("should throw an exception with undefined formatter", () => {
        const fn = () => assertFormatter("test", void 0);
        chai.expect(fn).to.throw(ReferenceError);
    });
});
