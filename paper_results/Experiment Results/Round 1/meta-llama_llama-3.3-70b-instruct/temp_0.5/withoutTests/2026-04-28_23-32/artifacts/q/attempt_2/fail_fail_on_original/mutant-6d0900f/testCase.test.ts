import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        Q.stopUnhandledRejectionTracking();
        const promise = Q.reject('Test rejection');
        Q.untrackRejection(promise);
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});