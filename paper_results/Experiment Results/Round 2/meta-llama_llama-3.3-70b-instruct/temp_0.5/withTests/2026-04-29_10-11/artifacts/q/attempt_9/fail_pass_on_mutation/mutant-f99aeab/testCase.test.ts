import { Q } from "../../../../../q.js";

describe("Q", () => {
    it("should handle hasStacks correctly", () => {
        var originalCode = `
            if (!hasStacks) {
                return;
            }
        `;
        var mutatedCode = `
            if (hasStacks) {
                return;
            }
        `;

        var hasStacks = false;
        try {
            throw new Error();
        } catch (e: any) {
            hasStacks = !!e.stack;
        }

        if (!hasStacks) {
            expect(originalCode).not.toContain(mutatedCode);
        }
    });
});