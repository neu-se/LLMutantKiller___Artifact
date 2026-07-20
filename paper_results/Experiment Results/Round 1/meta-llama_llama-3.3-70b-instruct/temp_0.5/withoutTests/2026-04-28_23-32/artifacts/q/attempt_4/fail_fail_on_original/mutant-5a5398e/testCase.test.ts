import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should throw an error with a specific message when trying to wrap an undefined function", () => {
        expect(() => Q.denodeify(undefined)).toThrowError("Q can't wrap an undefined function");
    });
});