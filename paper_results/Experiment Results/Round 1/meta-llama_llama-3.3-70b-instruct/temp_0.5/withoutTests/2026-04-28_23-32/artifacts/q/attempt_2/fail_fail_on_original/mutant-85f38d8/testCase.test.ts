import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.isRejected', () => {
    it('should return false for any input', () => {
        const rejectedPromise = Q.reject('error');
        const fulfilledPromise = Q.resolve('value');
        const notAPromise = 'hello';

        expect(Q.isRejected(rejectedPromise)).toBe(false);
        expect(Q.isRejected(fulfilledPromise)).toBe(false);
        expect(Q.isRejected(notAPromise)).toBe(false);
    });
});