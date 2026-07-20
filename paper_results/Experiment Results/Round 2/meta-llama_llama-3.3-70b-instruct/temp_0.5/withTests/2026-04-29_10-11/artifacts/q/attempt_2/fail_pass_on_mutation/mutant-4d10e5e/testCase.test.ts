import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create a promise with a stack trace', () => {
        var error = new Error('Test error');
        var promise = Q.reject(error);
        expect(promise.isRejected()).toBe(true);
        expect(promise.inspect().reason).toBe(error);
        expect(promise.inspect().reason.stack).toContain('at');
    });
});