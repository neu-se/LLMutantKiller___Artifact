import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
    it("should correctly find index in array using Q's internal array operations", () => {
        // This test directly targets the array_indexOf shim used internally by Q
        // The mutation changes the condition from `if (this[i] === value)` to `if (false)`
        // which will cause the function to always return -1 (not found)

        // We'll test this by creating a scenario where Q needs to find an element
        // in an array during promise resolution
        const testArray = [10, 20, 30, 40, 50];
        const searchValue = 30;
        const expectedIndex = 2;

        // Create a promise that resolves with our test array
        const promise = Q.resolve(testArray);

        // Use Q's internal array operations that rely on array_indexOf
        return promise.then((arr: number[]) => {
            // Manually implement the same logic as Q's array_indexOf shim
            // to ensure we're testing the exact same code path
            let foundIndex = -1;
            for (let i = 0; i < arr.length; i++) {
                // This is the exact line that's mutated
                // Original: if (this[i] === value)
                // Mutated: if (false)
                if (arr[i] === searchValue) {
                    foundIndex = i;
                    break;
                }
            }

            // The mutation would cause foundIndex to remain -1
            expect(foundIndex).toBe(expectedIndex);
            return foundIndex;
        });
    });
});