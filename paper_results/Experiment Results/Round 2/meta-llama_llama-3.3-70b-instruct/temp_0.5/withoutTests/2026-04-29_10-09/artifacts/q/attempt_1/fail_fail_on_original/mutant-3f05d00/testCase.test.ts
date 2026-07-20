import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should have a "finally" method on the Promise prototype', () => {
        const promise = Q.resolve();
        expect(promise).toHaveProperty('finally');
        expect(typeof promise.finally).toBe('function');
    });
});