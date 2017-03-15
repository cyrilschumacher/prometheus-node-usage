type Formatter = (value: number) => string;

/**
 * Options for formatter.
 * @interface
 */
interface OptionsFormatters {
    [key: string]: Formatter|OptionsFormattersMemory|undefined;

    /**
     * Formatter for "CPU usage" metric.
     * @type {Function}
     */
    cpuUsage?: Formatter;

    /**
     * Formatter for memory metrics.
     * @type {OptionsFormattersMemory}
     */
    memory?: OptionsFormattersMemory;
}
