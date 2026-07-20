import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should throw an error when given an undefined function", () => {
        expect(() => Q.denodeify()).toThrowError("Q can't wrap an undefined function");
    });
});