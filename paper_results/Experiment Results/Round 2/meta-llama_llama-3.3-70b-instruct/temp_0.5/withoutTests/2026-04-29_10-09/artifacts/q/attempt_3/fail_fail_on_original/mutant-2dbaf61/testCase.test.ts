import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly determine if an error has a stack trace", () => {
        try {
            throw new Error();
        } catch (e) {
            expect(e.stack).toBeDefined();
        }
        const hasStacks = Q.hasStacks;
        expect(hasStacks).toBe(true);
    });
});