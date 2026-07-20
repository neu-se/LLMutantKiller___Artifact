import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections correctly', () => {
        Q.stopUnhandledRejectionTracking();
        var promise = Q.reject('test');
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons().length).toBe(0);
        Q.stopUnhandledRejectionTracking();
        var promise2 = Q.reject('test2');
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons().length).toBe(0);
    });
});