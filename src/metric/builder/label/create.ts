export function createMetricLabels(labels: MetricLabel[]) {
    let metricLabels = "";
    if (labels && labels.length) {
        let items: string[] = [];
        for (const label of labels) {
            if (label && label.name && label.value) {
                items.push(`${label.name}="${label.value}"`);
            }
        }

        metricLabels = `{${items.join(",")}}`;
    }

    return metricLabels;
}
