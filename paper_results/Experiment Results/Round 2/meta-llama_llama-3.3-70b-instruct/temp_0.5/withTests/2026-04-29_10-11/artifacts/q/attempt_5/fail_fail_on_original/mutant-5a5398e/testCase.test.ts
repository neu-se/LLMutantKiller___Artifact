import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should throw an error when given an undefined function on the original code but not throw an error on the mutated code", () => {
        const denodeify = Q.denodeify;
        expect(() => denodeify(undefined)).toThrowError("Q can't wrap an undefined function");
    });
});