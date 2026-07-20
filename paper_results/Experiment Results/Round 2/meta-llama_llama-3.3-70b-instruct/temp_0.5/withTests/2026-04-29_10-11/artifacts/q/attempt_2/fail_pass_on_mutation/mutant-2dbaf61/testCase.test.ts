import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should set hasStacks to true when an error is thrown in the try-catch block", () => {
        var hasStacks = false;
        try {
            throw new Error();
        } catch (e) {
            hasStacks = !!e.stack;
        }
        expect(hasStacks).toBe(true);

        // Test the mutated code
        hasStacks = false;
        try {
        } catch (e) {
            hasStacks = !!e.stack;
        }
        expect(hasStacks).toBe(false);
    });
});