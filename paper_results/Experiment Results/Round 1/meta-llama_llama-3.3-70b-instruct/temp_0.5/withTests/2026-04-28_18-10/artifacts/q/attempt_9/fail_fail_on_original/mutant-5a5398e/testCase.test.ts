import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should not throw an error when calling Q.denodeify with a valid function", () => {
        expect(() => Q.denodeify(() => {})).not.toThrowError();
    });
});