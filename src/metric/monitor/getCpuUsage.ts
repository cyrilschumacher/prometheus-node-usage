import * as pidusage from "pidusage";

import { createMetric } from "../builder/create";

export function getCpuUsage(options: Options, stat: pidusage.Stat) {
    const cpuUsage = options.formatters!.cpuUsage!(stat.cpu);
    const cpuUsageMetricName = `${options.prefix}node_process_cpu_usage`;

    return createMetric(cpuUsageMetricName, cpuUsage);
}
