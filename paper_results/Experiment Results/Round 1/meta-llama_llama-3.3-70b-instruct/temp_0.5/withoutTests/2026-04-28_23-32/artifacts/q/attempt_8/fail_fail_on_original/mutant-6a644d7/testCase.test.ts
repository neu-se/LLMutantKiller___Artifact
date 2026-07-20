import { Q } from "../q.js";

describe('Q.race', () => {
    it('should return a promise', () => {
        const promise = Q.race([]);
        expect(promise).toBeInstanceOf(Promise);
    });
});