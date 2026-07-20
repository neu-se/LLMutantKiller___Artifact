import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.reject', () => {
    it('should untrack the rejection when the promise is rejected', () => {
        const rejectionReason = new Error('Test rejection reason');
        const promise = Q.reject(rejectionReason);
        const originalUnhandledRejectionsLength = Q.getUnhandledReasons().length;
        promise.then(null, () => {});
        expect(Q.getUnhandledReasons().length).toBe(originalUnhandledRejectionsLength - 1);
    });
});