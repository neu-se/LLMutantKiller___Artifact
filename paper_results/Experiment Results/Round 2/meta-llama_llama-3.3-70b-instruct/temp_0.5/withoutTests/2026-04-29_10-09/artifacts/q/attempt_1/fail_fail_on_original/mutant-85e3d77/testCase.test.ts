import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        const promise = Q.reject('Test rejection');
        const originalLength = Q.getUnhandledReasons().length;
        Q.stopUnhandledRejectionTracking();
        Q.resetUnhandledRejections();
        Q.stopUnhandledRejectionTracking();
        expect(Q.getUnhandledReasons().length).toBe(originalLength);
    });
});