import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.isRejected', () => {
    it('should return true for a rejected promise and false for a fulfilled promise', () => {
        const rejectedPromise = new q.Promise((resolve, reject) => reject('Error'));
        const fulfilledPromise = new q.Promise((resolve, reject) => resolve('Success'));
        expect(q.isRejected(rejectedPromise)).toBe(true);
        expect(q.isRejected(fulfilledPromise)).toBe(false);
    });
});