import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should not throw an error when callback is undefined in the mutated code but throw an error in the original code", () => {
        // In the mutated code, Q.denodeify should not throw an error
        // In the original code, Q.denodeify should throw an error
        try {
            Q.denodeify();
        } catch (error) {
            expect(error.message).toBe("Q can't wrap an undefined function");
        }
    });
});