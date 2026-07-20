import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.isRejected', () => {
    it('should not always return the same value for different inputs', () => {
        const rejectedPromise = Q.reject('error');
        const fulfilledPromise = Q.resolve('value');
        expect(Q.isRejected(rejectedPromise)).not.toBe(Q.isRejected(fulfilledPromise));
    });
});