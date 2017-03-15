import { createMetric } from "../../builder/create";

export function getHeapUsed(options: Options) {
    const memoryUsage = process.memoryUsage();
    const heapUsed = options.formatters!.memory!.heapUsed!(memoryUsage.heapUsed);
    const heapUsedMetricName = `${options.prefix}node_process_memory_used`;

    return createMetric(heapUsedMetricName, heapUsed);
}
