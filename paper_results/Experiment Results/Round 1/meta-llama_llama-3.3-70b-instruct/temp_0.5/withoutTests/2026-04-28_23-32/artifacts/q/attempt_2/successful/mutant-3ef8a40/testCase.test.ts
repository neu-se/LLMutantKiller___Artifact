import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should join two promises with the same value', () => {
        const promise1 = Q(1);
        const promise2 = Q(1);
        return Q.join(promise1, promise2).then((value) => {
            expect(value).toBe(1);
        });
    });
});