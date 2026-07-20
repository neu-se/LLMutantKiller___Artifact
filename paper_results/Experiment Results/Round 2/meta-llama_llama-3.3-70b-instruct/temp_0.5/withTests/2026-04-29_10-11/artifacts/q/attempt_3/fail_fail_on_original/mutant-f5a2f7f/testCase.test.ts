import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("q", () => {
    it("should test the behavior of the mutated file", () => {
        const hasStacks = false;
        try {
            throw new Error();
        } catch (e) {
            hasStacks = !!e.stack;
        }
        expect(hasStacks).toBe(true);
    });
});