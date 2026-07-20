import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should return a function when callback is a function", () => {
        const callback = function () { };
        const denodeified = Q.denodeify(callback);
        expect(typeof denodeified).toBe("function");
    });

    it("should throw an error when callback is not a function in the mutated code", () => {
        const callback = true;
        expect(() => Q.denodeify(callback)).toThrowError();
    });
});