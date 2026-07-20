import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return the fulfillment value of a promise', () => {
        const promise = Q.resolve(10);
        const result = Q.nearer(promise);
        expect(result).toBe(10);
    });
});