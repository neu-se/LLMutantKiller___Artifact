import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when trying to reduce an empty array without an initial value", () => {
        const array = [];
        const callback = function (basis, value) {
            return basis + value;
        };

        expect(() => Q.reduce(array, callback)).toThrowError();
    });
});