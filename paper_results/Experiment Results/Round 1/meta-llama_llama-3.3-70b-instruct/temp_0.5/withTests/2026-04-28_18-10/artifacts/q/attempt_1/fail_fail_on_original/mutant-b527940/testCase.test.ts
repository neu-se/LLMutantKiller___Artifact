import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections correctly', () => {
        const promise = Q.reject('Test rejection');
        const unhandledRejectionsBefore = Q.getUnhandledReasons();
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons()).toEqual([]);
        promise.catch(() => {});
        const unhandledRejectionsAfter = Q.getUnhandledReasons();
        expect(unhandledRejectionsAfter).toEqual([]);
    });
});