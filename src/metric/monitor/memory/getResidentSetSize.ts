import { createMetric } from "../../builder/create";

export function getResidentSetSize(options: Options) {
    const memoryUsage = process.memoryUsage();
    const residentSetSize = options.formatters!.memory!.residentSetSize!(memoryUsage.rss);
    const residentSetSizeMetricName = `${options.prefix}node_process_memory_rss`;

    return createMetric(residentSetSizeMetricName, residentSetSize);
}
