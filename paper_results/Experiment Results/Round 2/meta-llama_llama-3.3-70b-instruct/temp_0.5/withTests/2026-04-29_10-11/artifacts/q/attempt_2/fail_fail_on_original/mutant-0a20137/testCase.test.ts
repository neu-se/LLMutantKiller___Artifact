import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should throw an error when Q.join is called without an implementation", () => {
        expect(() => Q.join()).toThrow();
    });
});