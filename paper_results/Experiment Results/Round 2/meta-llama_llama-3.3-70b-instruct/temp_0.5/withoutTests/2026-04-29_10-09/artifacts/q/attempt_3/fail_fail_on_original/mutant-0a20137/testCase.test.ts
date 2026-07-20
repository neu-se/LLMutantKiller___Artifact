import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.join', () => {
    it('should return a promise that resolves with the joined value if the two promises resolve with the same value', () => {
        const promise1 = Q.resolve(5);
        const promise2 = Q.resolve(5);
        return expect(Q.join(promise1, promise2)).resolves.toEqual(5);
    });
});