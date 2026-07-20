import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q.reject', () => {
    it('should untrack the rejection when the promise is rejected', () => {
        const rejectionReason = new Error('Test rejection reason');
        const originalUnhandledRejectionsLength = q.getUnhandledReasons().length;
        const promise = q.reject(rejectionReason);
        promise.then(null, () => {
            q.untrackRejection(promise);
        });
        expect(q.getUnhandledReasons().length).toBe(originalUnhandledRejectionsLength);
    });
});