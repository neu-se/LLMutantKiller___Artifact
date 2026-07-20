import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not have long stack traces enabled when hasStacks is false', () => {
        const originalHasStacks = hasStacks;
        hasStacks = false;
        const error = new Error();
        const promise = Q.reject(error);
        const longStackSupport = Q.longStackSupport;
        expect(longStackSupport).toBe(false);
        hasStacks = originalHasStacks;
    });
});