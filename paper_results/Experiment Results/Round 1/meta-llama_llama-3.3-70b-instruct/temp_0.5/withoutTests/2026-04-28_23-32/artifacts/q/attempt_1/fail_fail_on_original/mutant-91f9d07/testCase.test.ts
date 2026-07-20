import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should throw an error when callback is undefined", () => {
        expect(() => Q.denodeify()).toThrowError("resolver must be a function.");
    });
});