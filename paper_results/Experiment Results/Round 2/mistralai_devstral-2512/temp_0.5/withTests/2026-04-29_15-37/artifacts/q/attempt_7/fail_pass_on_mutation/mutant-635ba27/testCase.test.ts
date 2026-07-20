import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
    it("should correctly find index in array using shim implementation", () => {
        // Save the original indexOf method
        const originalIndexOf = Array.prototype.indexOf;

        try {
            // Remove indexOf to force the shim to be used
            delete Array.prototype.indexOf;

            // Create a test array
            const testArray = [10, 20, 30, 40, 50];

            // Now any indexOf call should use the shim
            // The mutation (i--) would cause this to hang or fail
            return Q(testArray).then(function(arr) {
                // This will use the shim implementation
                const index = arr.indexOf(30);
                expect(index).toBe(2);
                return arr;
            }).then(function(arr) {
                // Test with value not in array
                const index = arr.indexOf(99);
                expect(index).toBe(-1);
            });
        } finally {
            // Restore original indexOf
            Array.prototype.indexOf = originalIndexOf;
        }
    });
});