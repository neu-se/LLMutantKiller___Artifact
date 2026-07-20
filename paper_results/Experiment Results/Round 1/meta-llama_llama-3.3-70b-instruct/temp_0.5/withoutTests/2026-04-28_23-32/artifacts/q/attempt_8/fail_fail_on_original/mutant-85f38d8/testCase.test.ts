import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.isRejected', () => {
    it('should return false for a non-promise', () => {
        const nonPromise = 'string';
        expect(Q.isRejected(nonPromise)).toBe(false);
    });
});