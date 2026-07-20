import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not have hasStacks set to true by default', () => {
        var hasStacks = false;
        try {
            throw new Error();
        } catch (e) {
            hasStacks = !!e.stack;
        }
        expect(hasStacks).toBe(false);
        var q = Q(1);
        expect(q.isFulfilled()).toBe(true);
    });
});