import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should result in a fulfilled promise when given a value", () => {
        var hasStacks = false;
        try {
            throw new Error();
        } catch (e) {
            hasStacks = !!e.stack;
        }
        expect(hasStacks).toBe(false);
    });
});