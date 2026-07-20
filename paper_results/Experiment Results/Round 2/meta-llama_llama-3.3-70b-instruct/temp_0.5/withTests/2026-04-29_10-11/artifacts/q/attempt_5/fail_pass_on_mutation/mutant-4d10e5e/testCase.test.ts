import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not set hasStacks to true by default', () => {
        var q = Q(1);
        expect(q.isFulfilled()).toBe(true);
        var error = new Error();
        expect(error.stack).toBeDefined();
        var promise = Q.reject(error);
        expect(promise.isRejected()).toBe(true);
        expect(promise.inspect().reason).toBe(error);
        expect(promise.inspect().reason.stack).toBeDefined();
    });
});