import { array_reduce } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when trying to reduce an empty array without an initial value in the mutated code", () => {
        const array: any[] = [];
        const callback = function (basis: any, value: any) {
            return basis + value;
        };

        // In the mutated code, this should throw an error
        expect(() => array_reduce(array, callback)).toThrowError();
    });
});