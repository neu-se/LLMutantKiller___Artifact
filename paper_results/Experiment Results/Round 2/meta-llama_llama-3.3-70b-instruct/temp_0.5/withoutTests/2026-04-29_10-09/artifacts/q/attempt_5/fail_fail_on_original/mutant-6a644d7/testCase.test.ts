import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.race', () => {
    it('should return a promise when given an array of promises', () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.resolve(2);
        const result = Q.race([promise1, promise2]);
        expect(result).toBeInstanceOf(Q.Promise);
    });
});