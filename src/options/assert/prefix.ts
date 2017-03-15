export function assertPrefix(propertyName: string, prefix?: string) {
    if (!prefix) {
        throw new ReferenceError(`Options error: "${propertyName}" must be not null, not undefined and not empty.`);
    }

    const format = /^[a-zA-Z0-9:_]+$/;
    const isValid = format.test(prefix);
    if (!isValid) {
        throw new TypeError(`Options error: "${propertyName}" is invalid. The expected format is: ${format}`);
    }
}
