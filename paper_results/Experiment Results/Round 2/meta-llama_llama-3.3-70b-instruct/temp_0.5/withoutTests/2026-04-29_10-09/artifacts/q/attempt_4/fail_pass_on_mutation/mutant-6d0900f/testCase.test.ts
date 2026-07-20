import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections correctly', () => {
        var promise = Q.reject('test');
        Q.stopUnhandledRejectionTracking();
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons().length).toBe(0);
    });
});