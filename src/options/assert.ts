import { assertFormatter } from "./assert/formatter";
import { assertPrefix } from "./assert/prefix";

export function assertOptions(options: Options) {
    assertPrefix("prefix", options.prefix);

    if (options.formatters) {
        assertFormatter("cpuUsage", options.formatters.cpuUsage);

        if (options.formatters.memory) {
            for (const formatterName in options.formatters.memory) {
                if (formatterName) {
                    const formatter = options.formatters.memory[formatterName];
                    assertFormatter(formatterName, formatter);
                }
            }
        }
    }
}
