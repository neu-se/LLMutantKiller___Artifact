import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should initialize hasStacks to false', () => {
        var hasStacks = false;
        try {
            throw new Error();
        } catch (e: any) {
            hasStacks = !!e.stack;
        }
        expect(hasStacks).toBe(false);
        var q = Q(1);
        expect(q.isFulfilled()).toBe(true);
    });
});