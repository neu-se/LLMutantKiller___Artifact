import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when Q.noConflict is called in a Node.js environment", () => {
        expect(() => Q.noConflict()).toThrowError("Q.noConflict only works when Q is used as a global");
    });
});