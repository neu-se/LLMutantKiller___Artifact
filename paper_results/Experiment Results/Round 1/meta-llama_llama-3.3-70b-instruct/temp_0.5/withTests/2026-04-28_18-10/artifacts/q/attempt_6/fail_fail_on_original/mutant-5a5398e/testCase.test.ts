import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should not throw an error when callback is undefined in the mutated code", () => {
        expect(() => Q.denodeify(undefined)).not.toThrowError();
    });
});