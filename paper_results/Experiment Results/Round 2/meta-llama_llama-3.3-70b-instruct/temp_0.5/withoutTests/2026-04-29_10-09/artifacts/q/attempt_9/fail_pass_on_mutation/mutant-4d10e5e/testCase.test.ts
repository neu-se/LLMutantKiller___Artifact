import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not enable long stack traces by default', () => {
        expect(Q.longStackSupport).toBe(false);
        const error = new Error();
        const promise = Q.reject(error);
        const stack = promise.inspect().reason.stack;
        expect(stack).not.toContain('q.js');
    });
});