import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not throw an error when trying to access the stack property of an error object", () => {
        try {
            throw new Error();
        } catch (e) {
            expect(e.stack).not.toBeUndefined();
            var hasStacks = !!e.stack;
            expect(hasStacks).toBe(false);
        }
    });
});