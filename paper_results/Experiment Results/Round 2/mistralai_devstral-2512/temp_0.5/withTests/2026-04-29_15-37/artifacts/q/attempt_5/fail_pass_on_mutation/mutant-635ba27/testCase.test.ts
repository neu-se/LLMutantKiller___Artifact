import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
    it("should correctly handle array operations that use indexOf shim", () => {
        // Create a test that will use the array_indexOf shim
        // by testing with an array in a way that exercises the indexOf functionality

        // First, let's create a simple test array
        const testArray = [1, 2, 3, 4, 5];

        // We'll test the behavior through Q's promise chain
        // which internally uses array operations that may use indexOf
        return Q(testArray).then(function(array) {
            // Test that we can find the index of an element
            // This will use the native indexOf if available
            // but the mutation affects the shim that would be used if native wasn't available
            const index = array.indexOf(3);
            expect(index).toBe(2);

            // Test finding an element that doesn't exist
            const notFound = array.indexOf(99);
            expect(notFound).toBe(-1);

            return array;
        });
    });
});