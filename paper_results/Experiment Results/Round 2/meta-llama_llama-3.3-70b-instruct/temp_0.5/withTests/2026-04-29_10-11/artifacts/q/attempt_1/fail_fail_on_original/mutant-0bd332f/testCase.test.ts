import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw a TypeError when the array is empty and no initial value is provided", () => {
        const array = [];
        const callback = function () { };
        const basis = undefined;

        expect(() => Q(array_reduce(array, callback, basis))).toThrowError(TypeError);
    });
});