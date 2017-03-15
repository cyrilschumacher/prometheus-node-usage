/// <reference types="mocha"/>

import * as chai from "chai";
import { normalizeOptions } from "../../src/options/normalize";

describe("normalizeOptions", () => {
    it("should normalize options", () => {
        const defaultOptions = { param2: "foo ", param3: "foo" };
        const options = { param1: "1", param2: "2" };

        const normalized = normalizeOptions(options, defaultOptions);
        chai.expect(normalized).to.have.property("param1", "1");
        chai.expect(normalized).to.have.property("param2", "2");
        chai.expect(normalized).to.have.property("param3", "foo");
    });
});
