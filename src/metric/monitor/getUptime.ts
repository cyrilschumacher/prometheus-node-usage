import { createMetric } from "../builder/create";

export function getUptime(options: Options) {
    const uptime = process.uptime();
    const cpuUsage = options.formatters!.cpuUsage!(uptime);
    const uptimeMetricName = `${options.prefix}node_process_uptime`;

    return createMetric(uptimeMetricName, uptime);
}
