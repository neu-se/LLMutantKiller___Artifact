import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.isRejected', () => {
    it('should not always return true', () => {
        const fulfilledPromise = Q.resolve('value');
        expect(Q.isRejected(fulfilledPromise)).not.toBe(true);
    });
});