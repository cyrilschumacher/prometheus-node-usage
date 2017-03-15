/**
 * Options for formatter.
 * @interface
 */
interface OptionsFormattersMemory {
    [key: string]: Formatter|undefined;

    /**
     * Formatter for "Heap total" metric.
     * @type {Function}
     */
    heapTotal?: Formatter;

    /**
     * Formatter for "Heap used" metric.
     * @type {Function}
     */
    heapUsed?: Formatter;

    /**
     * Formatter for "Resident set size" metric.
     * @type {Function}
     */
    residentSetSize?: Formatter;
}
