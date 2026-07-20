import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not throw an error when the array is empty and no initial value is provided", () => {
        const array = [];
        const callback = function (basis, value) {
            return basis + value;
        };

        expect(() => Q(array_reduce(array, callback))).not.toThrowError();
    });
});