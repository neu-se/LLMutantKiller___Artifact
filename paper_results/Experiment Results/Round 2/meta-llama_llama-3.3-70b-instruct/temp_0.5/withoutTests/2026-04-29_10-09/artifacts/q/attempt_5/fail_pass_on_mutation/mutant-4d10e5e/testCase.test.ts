import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not have long stack traces enabled by default when hasStacks is false', () => {
        const originalHasStacks = Q.hasStacks;
        Q.hasStacks = false;
        expect(Q.longStackSupport).toBe(false);
        Q.hasStacks = originalHasStacks;
    });
});