import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not have long stack support enabled by default when hasStacks is true', () => {
        var hasStacks = true;
        Q.longStackSupport = false;
        expect(Q.longStackSupport).toBe(false);
    });
});