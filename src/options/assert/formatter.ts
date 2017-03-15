export function assertFormatter(propertyName: string, formatter?: Formatter) {
    if (!formatter) {
        throw new ReferenceError(`Options error: "${propertyName}" must have formatter.`);
    } else if (typeof formatter !== "function") {
        throw new TypeError(`Options error: "${propertyName}" must have a function that represents a formatter.`);
    }
}
