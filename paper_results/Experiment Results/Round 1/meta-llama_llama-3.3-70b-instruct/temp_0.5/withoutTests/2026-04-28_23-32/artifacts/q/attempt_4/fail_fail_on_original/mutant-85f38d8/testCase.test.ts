import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.isRejected', () => {
    it('should return false for a non-promise value', () => {
        const notAPromise = 'hello';
        expect(Q.isRejected(notAPromise)).toBe(false);
    });
});