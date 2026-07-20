import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.isRejected', () => {
    it('should return true for a rejected promise and false for a fulfilled promise and a non-promise value', () => {
        const rejectedPromise = Q.reject('error');
        const fulfilledPromise = Q.resolve('value');
        const notAPromise = 'hello';

        expect(Q.isRejected(rejectedPromise)).toBe(true);
        expect(Q.isRejected(fulfilledPromise)).toBe(false);
        expect(Q.isRejected(notAPromise)).toBe(false);
    });
});