import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should throw an error with a specific message when resolver is not a function", () => {
        expect(() => Q.promise()).toThrowError("resolver must be a function.");
    });
});