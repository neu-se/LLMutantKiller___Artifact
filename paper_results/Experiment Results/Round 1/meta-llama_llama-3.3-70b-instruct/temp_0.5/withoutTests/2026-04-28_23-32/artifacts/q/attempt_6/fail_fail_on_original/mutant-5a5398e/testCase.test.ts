import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should throw an error with a specific message when trying to wrap an undefined function, but not when trying to wrap a defined function", () => {
        const func = () => {};
        expect(() => Q.denodeify(func)).not.toThrowError();
        expect(() => Q.denodeify(undefined)).toThrowError("Q can't wrap an undefined function");
    });
});