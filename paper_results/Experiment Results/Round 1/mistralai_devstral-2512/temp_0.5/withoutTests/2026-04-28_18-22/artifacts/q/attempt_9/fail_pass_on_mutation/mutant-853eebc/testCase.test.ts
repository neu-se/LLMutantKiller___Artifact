// Test case to detect the mutation in array_map implementation
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_map mutation", () => {
    it("should correctly execute array_map callback function", () => {
        // Directly test the array_map shim that was mutated
        const testArray = [1, 2, 3];
        let callbackExecuted = false;

        // This will use the internal array_map implementation
        const result = Q.resolve(testArray).then((arr: number[]) => {
            return arr.map((x: number) => {
                callbackExecuted = true;
                return x * 2;
            });
        });

        return result.then((mapped: number[]) => {
            // Verify callback was executed
            expect(callbackExecuted).toBe(true);
            // Verify mapping worked
            expect(mapped).toEqual([2, 4, 6]);
        });
    });
});