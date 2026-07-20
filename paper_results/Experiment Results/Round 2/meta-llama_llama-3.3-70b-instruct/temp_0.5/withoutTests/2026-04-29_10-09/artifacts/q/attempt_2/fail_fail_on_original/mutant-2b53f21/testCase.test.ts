import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.reject', () => {
    it('should reject the promise and track the rejection', () => {
        const rejectionReason = new Error('Test rejection reason');
        const promise = Q.reject(rejectionReason);
        promise.then(null, () => {});
        expect(Q.getUnhandledReasons().length).toBe(1);
    });
});