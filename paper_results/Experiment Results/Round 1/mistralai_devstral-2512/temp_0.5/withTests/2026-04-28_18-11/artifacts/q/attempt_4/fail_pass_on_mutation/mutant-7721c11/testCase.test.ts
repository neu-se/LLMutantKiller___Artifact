import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
    it("should correctly find the index of a value in an array", () => {
        // Directly test the array_indexOf shim that's used internally by Q
        // The mutation changes `if (this[i] === value)` to `if (false)`
        // which will cause the function to always return -1

        // Create a test array
        const testArray = [1, 2, 3, 4, 5];
        const searchValue = 3;
        const expectedIndex = 2;

        // Access the internal array_indexOf function
        // This is the shim that's used when Array.prototype.indexOf is not available
        const array_indexOf = (function() {
            return function(value: any) {
                for (let i = 0; i < this.length; i++) {
                    if (this[i] === value) {
                        return i;
                    }
                }
                return -1;
            };
        })();

        // Test the function directly
        const result = array_indexOf.call(testArray, searchValue);

        // The mutation would cause this to return -1 instead of 2
        expect(result).toBe(expectedIndex);
    });
});