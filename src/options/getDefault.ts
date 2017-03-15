function format(value: number) {
    return "" + value;
}

export function getDefaultOptions(options?: Options, defaultFormatter = format, defaultPrefix = ""): Options {
    return {
        formatters: {
            cpuUsage: defaultFormatter,
            memory: {
                heapTotal: defaultFormatter,
                heapUsed: defaultFormatter,
                residentSetSize: defaultFormatter,
            },
            uptime: defaultFormatter,
        },
        prefix: defaultPrefix,
    };
}
