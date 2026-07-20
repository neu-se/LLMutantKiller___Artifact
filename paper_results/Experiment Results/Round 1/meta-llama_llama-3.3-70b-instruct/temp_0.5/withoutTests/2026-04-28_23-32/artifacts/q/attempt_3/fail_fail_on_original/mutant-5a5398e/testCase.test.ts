import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should throw an error when trying to wrap an undefined function", () => {
        const denodeify = Q.denodeify;
        expect(() => denodeify(undefined)).toThrowError();
    });
});