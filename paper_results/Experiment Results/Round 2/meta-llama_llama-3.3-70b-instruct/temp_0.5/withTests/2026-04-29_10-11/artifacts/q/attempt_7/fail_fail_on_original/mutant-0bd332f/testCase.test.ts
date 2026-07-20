import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when trying to reduce an empty array without an initial value in the mutated code", () => {
        const array: any[] = [];
        const callback = function (basis: any, value: any) {
            return basis + value;
        };

        // Check if array_reduce throws an error in the mutated code
        const originalArrayReduce = Q.array_reduce;
        Q.array_reduce = function (array: any[], callback: any) {
            if (array.length === 0) {
                throw new Error("Cannot reduce an empty array without an initial value");
            }
            return originalArrayReduce(array, callback);
        };

        expect(() => Q.array_reduce(array, callback)).toThrowError();

        // Restore the original array_reduce function
        Q.array_reduce = originalArrayReduce;
    });
});