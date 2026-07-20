import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.join', () => {
    it('should throw an error when the two promises resolve with different values', () => {
        const promise1 = Q.resolve(5);
        const promise2 = Q.resolve(10);
        const joinedPromise = Q.join(promise1, promise2);
        return expect(joinedPromise).rejects.toThrowError("Q can't join: not the same: 5 10");
    });
});