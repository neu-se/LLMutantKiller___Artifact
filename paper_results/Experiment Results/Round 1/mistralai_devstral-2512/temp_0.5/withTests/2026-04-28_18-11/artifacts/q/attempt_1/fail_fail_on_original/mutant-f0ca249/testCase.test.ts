import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should correctly handle sparse arrays in array_reduce", () => {
        // Create a sparse array where the first element is missing
        const sparseArray = [, 10, 20]; // index 0 is missing

        // Use Q.all which internally uses array_reduce to process the array
        const promises = sparseArray.map((value, index) => {
            if (value === undefined && !(index in sparseArray)) {
                // This is a hole in the array, return a resolved promise
                return Q.resolve(undefined);
            }
            return Q.resolve(value);
        });

        return Q.all(promises).then(result => {
            // The result should maintain the sparse nature of the array
            expect(result).toEqual([, 10, 20]);
            expect(0 in result).toBe(false);
            expect(1 in result).toBe(true);
            expect(result[1]).toBe(10);
            expect(2 in result).toBe(true);
            expect(result[2]).toBe(20);
        });
    });
});