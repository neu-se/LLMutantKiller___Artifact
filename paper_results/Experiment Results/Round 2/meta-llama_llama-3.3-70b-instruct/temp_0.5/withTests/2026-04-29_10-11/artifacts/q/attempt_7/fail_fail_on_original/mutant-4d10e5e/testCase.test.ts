import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should have hasStacks as false when initialized', () => {
        var hasStacks = false;
        try {
            throw new Error();
        } catch (e) {
            hasStacks = !!e.stack;
        }
        var q = Q(1);
        expect(hasStacks).toBe(false);
    });
});