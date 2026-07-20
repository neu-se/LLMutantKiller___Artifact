import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle stack traces', () => {
        var hasStacks = false;
        try {
            throw new Error();
        } catch (e) {
            hasStacks = !!e.stack;
        }
        if (hasStacks) {
            expect(q.qFileName).toBeUndefined();
        } else {
            expect(hasStacks).toBe(false);
        }
    });
});