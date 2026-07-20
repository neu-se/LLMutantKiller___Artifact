import { Q } from "../../../../../q.js";

describe("Q", () => {
    it("should handle hasStacks correctly", () => {
        var hasStacks = false;
        try {
            throw new Error();
        } catch (e) {
            hasStacks = !!e.stack;
        }

        if (!hasStacks) {
            expect(true).toBe(true);
        } else {
            expect(true).toBe(false);
        }
    });
});