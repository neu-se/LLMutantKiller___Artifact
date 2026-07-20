import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not include internal frames in stack traces by default', () => {
        const error = new Error();
        const promise = Q.reject(error);
        const stack = promise.inspect().reason.stack;
        expect(stack).not.toContain('isInternalFrame');
    });
});