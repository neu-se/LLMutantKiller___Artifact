import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should throw an error with the correct message when trying to wrap an undefined function", () => {
        const originalError = new Error("Q can't wrap an undefined function");
        expect(() => Q.denodeify(undefined)).toThrowError(originalError.message);
    });
});