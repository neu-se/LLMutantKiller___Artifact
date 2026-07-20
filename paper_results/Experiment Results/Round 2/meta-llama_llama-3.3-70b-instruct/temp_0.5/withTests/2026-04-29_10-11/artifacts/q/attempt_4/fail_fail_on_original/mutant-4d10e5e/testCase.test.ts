import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should have hasStacks set to false when stack traces are not supported', () => {
        var originalHasStacks = false;
        try {
            throw new Error();
        } catch (e) {
            originalHasStacks = !!e.stack;
        }
        var hasStacks = originalHasStacks;
        expect(hasStacks).toBe(false);
    });
});