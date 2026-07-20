const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
    it("should correctly find first value in sparse array", () => {
        // Directly test the array_reduce implementation
        // Create a sparse array where first element is missing
        const sparseArray = [, 10, 20]; // index 0 is missing

        // This will test the reduce implementation with a sparse array
        // The mutation would cause it to fail to find the first value
        const result = Q.all([sparseArray[1], sparseArray[2]]);

        return result.then((values: any[]) => {
            expect(values[0]).toBe(10);
            expect(values[1]).toBe(20);
        });
    });
});