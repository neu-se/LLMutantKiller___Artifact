import { array_reduce } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not throw an error when trying to reduce an array with an initial value", () => {
        const array = [1, 2, 3];
        const callback = function (basis: number, value: number) {
            return basis + value;
        };
        const initialValue = 0;

        // In the original code, this should not throw an error
        expect(() => array_reduce(array, callback, initialValue)).not.toThrowError();
    });
});