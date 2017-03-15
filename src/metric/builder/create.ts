import { createMetricLabels } from "./label/create";

export function createMetric(name: string, value: any, ...labels: MetricLabel[]) {
    const metricLabels = createMetricLabels(labels);
    return `${name}${metricLabels} ${value}`;
}
