import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should have a "finally" method on the Promise prototype', () => {
        const promise = Q.resolve();
        const hasFinallyMethod = 'finally' in promise;
        expect(hasFinallyMethod).toBe(true);
    });
});