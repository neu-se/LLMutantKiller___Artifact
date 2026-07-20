import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle stack traces', () => {
        var hasStacks = false;
        try {
            throw new Error();
        } catch (e) {
            hasStacks = !!e.stack;
        }
        if (hasStacks) {
            var error = new Error();
            try {
                Q.resolve().then(() => {
                    throw error;
                });
            } catch (e) {
                expect(e.stack).toContain("q.js");
            }
        } else {
            expect(hasStacks).toBe(false);
        }
    });
});