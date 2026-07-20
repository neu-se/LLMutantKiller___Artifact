import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should not throw an error when given a defined function", () => {
        const denodeify = Q.denodeify;
        expect(() => denodeify(() => {})).not.toThrowError();
    });
});