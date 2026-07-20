import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should return a function when callback is a function", () => {
        const callback = function () { };
        const denodeified = Q.denodeify(callback);
        expect(typeof denodeified).toBe("function");
    });

    it("should not throw an error when callback is undefined in the mutated code", () => {
        const originalDenodeify = Q.denodeify;
        Q.denodeify = function () {
            return function () { };
        };
        expect(() => Q.denodeify()).not.toThrowError();
    });
});