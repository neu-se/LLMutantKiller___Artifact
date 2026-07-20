import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        Q.stopUnhandledRejectionTracking();
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons()).toHaveLength(0);
        const promise = Q.reject('Test rejection');
        Q.done(promise, null, null, null);
        expect(Q.getUnhandledReasons()).toHaveLength(1);
    });
});