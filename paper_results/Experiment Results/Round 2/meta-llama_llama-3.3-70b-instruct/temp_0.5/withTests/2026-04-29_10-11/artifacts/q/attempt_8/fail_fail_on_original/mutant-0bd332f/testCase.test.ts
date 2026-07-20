import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not throw an error when trying to reduce a non-empty array", () => {
        const array = [1, 2, 3];
        const callback = function (basis, value) {
            return basis + value;
        };

        // In the original code, this should not throw an error
        expect(() => Q(array_reduce(array, callback))).not.toThrowError();
    });
});