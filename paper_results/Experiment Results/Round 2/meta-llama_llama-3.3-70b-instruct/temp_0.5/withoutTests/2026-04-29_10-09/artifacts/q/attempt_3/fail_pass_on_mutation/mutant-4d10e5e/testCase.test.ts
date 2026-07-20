import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not have long stack traces enabled by default', () => {
        expect(Q.longStackSupport).toBe(false);
    });
});