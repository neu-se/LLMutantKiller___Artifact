import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        Q.stopUnhandledRejectionTracking();
        const promise = Q.reject('Test rejection');
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons().length).toBe(1);
        promise.catch(() => {});
        expect(Q.getUnhandledReasons().length).toBe(0);
    });
});