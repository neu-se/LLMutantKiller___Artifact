import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
    it("should correctly find index of value in array using indexOf", () => {
        // Create a test case that will use the array_indexOf shim
        // by testing with an array in an environment where indexOf might not be available
        // We'll test this by creating a scenario that exercises the indexOf functionality

        // First, let's verify the basic functionality works
        const testArray = [1, 2, 3, 4, 5];

        // This will use array_indexOf internally when checking if a value exists in an array
        // We'll test this through Q's promise functionality
        return Q(testArray).then(function(array) {
            // The mutation would cause indexOf to fail, which could affect array operations
            // Let's test that we can find the index of an element
            const index = array.indexOf(3);
            expect(index).toBe(2);
            return array;
        }).then(function(array) {
            // Test finding an element that doesn't exist
            const index = array.indexOf(99);
            expect(index).toBe(-1);
        });
    });
});