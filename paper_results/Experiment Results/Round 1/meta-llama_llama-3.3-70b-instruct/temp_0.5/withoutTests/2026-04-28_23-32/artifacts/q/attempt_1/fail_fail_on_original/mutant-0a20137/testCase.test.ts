import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.join', () => {
    it('should join two promises', () => {
        const promise1 = Q(1);
        const promise2 = Q(1);
        const joinedPromise = Q.join(promise1, promise2);
        expect(joinedPromise).resolves.toBe(1);
    });
});