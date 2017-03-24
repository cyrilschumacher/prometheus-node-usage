/// <reference types="mocha" />
/// <reference types="node" />

import * as chai from "chai";
import * as process from "process";
import * as sinon from "sinon";

import { getUptime } from "../../../src/metrics/monitor/getUptime";

describe("getUptime()", () => {
    before(() => {
        const cpuUsageStub = sinon.stub(process, "uptime");
        cpuUsageStub.returns(1);
    });

    it("should return uptime metric", () => {
        const uptime = getUptime(process);
        chai.expect(uptime).to.be.equal("node_process_uptime 1");
    });

    it("should return uptime metric with custom name", () => {
        const uptime = getUptime(process, "test");
        chai.expect(uptime).to.be.equal("test 1");
    });
});
