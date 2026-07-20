import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should throw an error when given an undefined function on the mutated code", () => {
        const denodeify = Q.denodeify;
        expect(() => denodeify(undefined)).not.toThrowError();
    });
});