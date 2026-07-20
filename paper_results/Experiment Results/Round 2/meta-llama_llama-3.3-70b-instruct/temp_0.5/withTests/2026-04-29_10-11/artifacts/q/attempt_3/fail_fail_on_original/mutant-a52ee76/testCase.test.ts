import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should throw an error when Q.noConflict is called in a non-browser environment", () => {
        expect(() => Q.noConflict()).toThrowError("Q.noConflict only works when Q is used as a global");
    });
});