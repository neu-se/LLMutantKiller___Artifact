import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.Promise", () => {
    it("should throw an error when resolver is not a function", () => {
        expect(() => Q.Promise(null)).toThrowError("resolver must be a function.");
    });
});