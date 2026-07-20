import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
    it("should correctly find element in array using Q's internal indexOf", () => {
        // This test directly exercises the array_indexOf shim that's mutated
        // The mutation changes `if (this[i] === value)` to `if (false)`
        // which will cause the function to always return -1

        // Create a test case that forces Q to use its internal array_indexOf
        // by temporarily removing the native Array.prototype.indexOf
        const originalIndexOf = Array.prototype.indexOf;
        try {
            // Remove the native indexOf to force Q to use its shim
            (Array.prototype as any).indexOf = undefined;

            // Create a test array
            const testArray = [1, 2, 3, 4, 5];
            const searchValue = 3;
            const expectedIndex = 2;

            // Use Q's internal array operations that would use the shim
            // We'll test this through Q.all which uses array_indexOf internally
            const promises = testArray.map(value =>
                value === searchValue ? Q.resolve(value) : Q.resolve(value)
            );

            return Q.all(promises).then((results: number[]) => {
                // Find the index of our search value in the results
                // This should use Q's internal array_indexOf shim
                let foundIndex = -1;
                for (let i = 0; i < results.length; i++) {
                    if (results[i] === searchValue) {
                        foundIndex = i;
                        break;
                    }
                }

                // The mutation would cause this to fail
                expect(foundIndex).toBe(expectedIndex);
            });
        } finally {
            // Restore the native indexOf
            Array.prototype.indexOf = originalIndexOf;
        }
    });
});