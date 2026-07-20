import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should throw an error when given an undefined function", () => {
        const denodeify = Q.denodeify;
        expect(() => denodeify(undefined)).toThrowError("Q can't wrap an undefined function");
    });

    it("should not throw an error when given a defined function", () => {
        const denodeify = Q.denodeify;
        expect(() => denodeify(() => {})).not.toThrowError();
    });
});