import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections correctly', () => {
        var promise = Q.reject('test');
        Q.untrackRejection(promise);
        expect(Q.getUnhandledReasons().length).toBe(0);
    });
});