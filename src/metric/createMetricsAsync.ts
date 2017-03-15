import * as pidusage from "pidusage";

import { getCpuUsage } from "./monitor/getCpuUsage";
import { getUptime } from "./monitor/getUptime";
import { getHeapTotal } from "./monitor/memory/getHeapTotal";
import { getHeapUsed } from "./monitor/memory/getHeapUsed";
import { getResidentSetSize } from "./monitor/memory/getResidentSetSize";

import { getStatAsync } from "./getStatAsync";

export type GetMetricsResolve = (result: string) => void;
export type GetMetricsReject = (error: any) => void;

export async function createMetricsAsync(resolve: GetMetricsResolve, reject: GetMetricsReject, options: Options) {
    const stat = await getStatAsync(process.pid);
    let metrics: string[] = [];
    const heapUsedMetric = getHeapUsed(options);
    metrics.push(heapUsedMetric);

    const heapTotalMetric = getHeapTotal(options);
    metrics.push(heapTotalMetric);

    const residentSetSizeMetric = getResidentSetSize(options);
    metrics.push(residentSetSizeMetric);

    const cpuUsageMetric = getCpuUsage(options, stat);
    metrics.push(cpuUsageMetric);

    const uptimeMetric = getUptime(options);
    metrics.push(uptimeMetric);

    resolve(`${metrics.join("\n")}\n`);
}
