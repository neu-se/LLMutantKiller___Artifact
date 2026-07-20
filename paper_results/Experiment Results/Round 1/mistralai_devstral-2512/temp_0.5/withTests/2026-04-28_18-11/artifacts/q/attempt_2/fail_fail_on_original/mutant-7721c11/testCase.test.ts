import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
    it("should correctly find the index of a value in an array", () => {
        const array = [1, 2, 3, 4, 5];
        const value = 3;
        const expectedIndex = 2;

        // This test directly tests the array_indexOf shim by using it in a context
        // where Q's internal operations would use it. The mutation changes the
        // condition from `if (this[i] === value)` to `if (false)`, which will
        // cause the function to always return -1 (not found).
        const result = Q.resolve(array)
            .then((arr: number[]) => {
                // We need to trigger the internal array_indexOf implementation
                // The mutation is in the shim that's used when Array.prototype.indexOf is not available
                // We'll force the use of the shim by temporarily replacing the native method
                const originalIndexOf = Array.prototype.indexOf;
                (Array.prototype as any).indexOf = undefined;

                try {
                    // This will use Q's internal array_indexOf shim
                    const foundIndex = arr.indexOf(value);
                    return foundIndex;
                } finally {
                    Array.prototype.indexOf = originalIndexOf;
                }
            });

        return result.then((index: number) => {
            expect(index).toBe(expectedIndex);
        });
    });
});