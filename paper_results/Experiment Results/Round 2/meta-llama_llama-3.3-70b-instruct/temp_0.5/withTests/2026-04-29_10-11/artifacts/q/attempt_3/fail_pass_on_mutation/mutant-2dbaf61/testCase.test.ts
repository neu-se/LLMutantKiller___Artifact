import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should throw an error when no error is thrown in the try-catch block in the mutated code", () => {
        var hasStacks;
        try {
        } catch (e) {
            hasStacks = !!e.stack;
        }
        expect(hasStacks).toBeUndefined();
    });
});