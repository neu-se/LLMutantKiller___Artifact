import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        const promise = Q.reject('Test rejection');
        Q.stopUnhandledRejectionTracking();
        expect(Q.getUnhandledReasons().length).toBe(1);
    });
});