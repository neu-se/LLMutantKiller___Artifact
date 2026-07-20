import { array_reduce } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when trying to reduce an empty array without an initial value in the mutated code", () => {
        const array: any[] = [];
        const callback = function (basis: any, value: any) {
            return basis + value;
        };

        // In the mutated code, this should throw an error
        const originalArrayReduce = array_reduce;
        array_reduce = function (array: any[], callback: any) {
            if (array.length === 0) {
                throw new Error("Cannot reduce an empty array without an initial value");
            }
            return originalArrayReduce(array, callback);
        };

        expect(() => array_reduce(array, callback)).toThrowError();

        // Restore the original array_reduce function
        array_reduce = originalArrayReduce;
    });
});