import { createMetric } from "../../builder/create";

export function getHeapUsed(options: Options, currentProcess = process) {
    const memoryUsage = currentProcess.memoryUsage();
    const heapUsed = options.formatters!.memory!.heapUsed!(memoryUsage.heapUsed);
    const heapUsedMetricName = `${options.prefix}node_process_memory_used`;

    return createMetric(heapUsedMetricName, heapUsed);
}
