/// <reference types="mocha"/>

import * as chai from "chai";
import * as proxyquire from "proxyquire";
import { getCpuUsage} from "../../../src/metric/monitor/getCpuUsage";

describe("getCpuUsage", () => {
    it("should return CPU usage without custom prefix", () => {
        const formatCpuUsage = (cpuUsage: number) => "" + cpuUsage;
        const options = { prefix: "", formatters: { cpuUsage: formatCpuUsage } };
        const stat = { cpu: 3.14, mem: 0 };
        const cpuUsage = getCpuUsage(options, stat);

        chai.expect(cpuUsage).to.be.equal("node_process_cpu_usage 3.14");
    });

    it("should return CPU usage with custom prefix", () => {
        const formatCpuUsage = (cpuUsage: number) => "" + cpuUsage;
        const options = { prefix: "test_", formatters: { cpuUsage: formatCpuUsage } };
        const stat = { cpu: 3.14, mem: 0 };
        const cpuUsage = getCpuUsage(options, stat);

        chai.expect(cpuUsage).to.be.equal("test_node_process_cpu_usage 3.14");
    });

    it("should return CPU usage with custom formatter", () => {
        const formatCpuUsage = (cpuUsage: number) => "100";
        const options = { prefix: "", formatters: { cpuUsage: formatCpuUsage } };
        const stat = { cpu: 3.14, mem: 0 };
        const cpuUsage = getCpuUsage(options, stat);

        chai.expect(cpuUsage).to.be.equal("node_process_cpu_usage 100");
    });
});
