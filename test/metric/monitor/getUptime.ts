/// <reference types="mocha"/>
/// <reference types="node"/>

import * as chai from "chai";
import * as proxyquire from "proxyquire";
import { getUptime } from "../../../src/metric/monitor/getUptime";

describe("getUptime", () => {
    let processStub: {};

    before(() => {
        processStub = {
            uptime: () => 1,
        };
    });

    it("should return uptime without custom prefix", () => {
        const formatUptime = (uptime: number) => "" + uptime;
        const options = { prefix: "", formatters: { uptime: formatUptime } };
        const uptime = getUptime.call(void 0, options, processStub);

        chai.expect(uptime).to.be.equal("node_process_uptime 1");
    });

    it("should return CPU usage with custom prefix", () => {
        const formatUptime = (uptime: number) => "" + uptime;
        const options = { prefix: "test_", formatters: { uptime: formatUptime } };
        const uptime = getUptime.call(void 0, options, processStub);

        chai.expect(uptime).to.be.equal("test_node_process_uptime 1");
    });

    it("should return CPU usage with custom formatter", () => {
        const formatUptime = (uptime: number) => "2";
        const options = { prefix: "", formatters: { uptime: formatUptime } };
        const uptime = getUptime.call(void 0, options, processStub);

        chai.expect(uptime).to.be.equal("node_process_uptime 2");
    });
});
