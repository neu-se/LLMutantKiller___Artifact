import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should have long stack traces disabled by default when hasStacks is false', () => {
        const error = new Error();
        const promise = Q.reject(error);
        const stack = promise.inspect().reason.stack;
        expect(stack).not.toContain('q.js');
    });
});