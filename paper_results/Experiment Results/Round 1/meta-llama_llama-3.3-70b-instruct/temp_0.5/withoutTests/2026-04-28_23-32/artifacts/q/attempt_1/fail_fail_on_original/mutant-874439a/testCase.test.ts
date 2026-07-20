import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.isRejected', () => {
    it('should return true for a rejected promise', () => {
        const rejectedPromise = Q.reject('Error');
        expect(Q.isRejected(rejectedPromise)).toBe(true);
    });

    it('should return false for a fulfilled promise', () => {
        const fulfilledPromise = Q.resolve('Success');
        expect(Q.isRejected(fulfilledPromise)).toBe(false);
    });

    it('should return false for a non-promise value', () => {
        expect(Q.isRejected('not a promise')).toBe(false);
    });
});