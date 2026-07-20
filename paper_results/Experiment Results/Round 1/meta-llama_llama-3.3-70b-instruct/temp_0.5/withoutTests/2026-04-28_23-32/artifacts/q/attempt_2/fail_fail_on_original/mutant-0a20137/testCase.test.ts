import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.join', () => {
    it('should join two promises', () => {
        const promise1 = Q(1);
        const promise2 = Q(1);
        const joinedPromise = Q.join(promise1, promise2);
        expect(joinedPromise).resolves.toBe(1);
    });

    it('should throw an error when promises do not resolve to the same value', () => {
        const promise1 = Q(1);
        const promise2 = Q(2);
        const joinedPromise = Q.join(promise1, promise2);
        expect(joinedPromise).rejects.toThrow("Q can't join: not the same: 1 2");
    });
});