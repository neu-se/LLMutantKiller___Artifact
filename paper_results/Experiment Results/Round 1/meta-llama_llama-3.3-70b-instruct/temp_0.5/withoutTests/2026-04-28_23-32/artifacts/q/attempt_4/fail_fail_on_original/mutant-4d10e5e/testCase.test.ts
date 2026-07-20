import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not have long stack traces by default", () => {
        var error = new Error();
        try {
            throw error;
        } catch (e) {
            var hasStacks = !!e.stack;
            expect(hasStacks).toBe(false);
        }
    });
});