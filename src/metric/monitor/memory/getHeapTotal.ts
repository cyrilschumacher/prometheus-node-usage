import { createMetric } from "../../builder/create";

export function getHeapTotal(options: Options, currentProcess = process) {
    const memoryUsage = currentProcess.memoryUsage();
    const heapTotal = options.formatters!.memory!.heapTotal!(memoryUsage.heapTotal);
    const heapTotalMetricName = `${options.prefix}node_process_memory_total`;

    return createMetric(heapTotalMetricName, heapTotal);
}
