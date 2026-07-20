import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.isRejected', () => {
    it('should return true for a rejected promise and false for a non-promise value', () => {
        const rejectedPromise = Q.reject('error');
        const notAPromise = 'hello';
        expect(Q.isRejected(rejectedPromise)).toBe(true);
        expect(Q.isRejected(notAPromise)).toBe(false);
    });
});