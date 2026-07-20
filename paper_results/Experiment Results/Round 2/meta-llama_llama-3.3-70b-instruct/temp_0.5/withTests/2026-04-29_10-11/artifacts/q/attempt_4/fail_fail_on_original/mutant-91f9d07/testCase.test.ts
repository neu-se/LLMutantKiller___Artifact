import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should throw an error when callback is undefined", () => {
        expect(() => Q.denodeify(undefined)).toThrowError("callback must be a function.");
    });

    it("should return a function when callback is a function", () => {
        const callback = function () { };
        const denodeified = Q.denodeify(callback);
        expect(typeof denodeified).toBe("function");
    });
});