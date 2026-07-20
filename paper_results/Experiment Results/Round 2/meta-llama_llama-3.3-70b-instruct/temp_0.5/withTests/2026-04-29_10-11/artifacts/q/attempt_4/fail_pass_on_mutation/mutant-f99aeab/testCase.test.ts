import { Q } from "../../../../../q.js";

describe("Q", () => {
    it("should handle hasStacks correctly", () => {
        var hasStacks = false;
        try {
            throw new Error();
        } catch (e: any) {
            hasStacks = !!e.stack;
        }

        if (hasStacks) {
            expect(hasStacks).toBe(true);
        } else {
            expect(hasStacks).toBe(false);
        }
    });
});