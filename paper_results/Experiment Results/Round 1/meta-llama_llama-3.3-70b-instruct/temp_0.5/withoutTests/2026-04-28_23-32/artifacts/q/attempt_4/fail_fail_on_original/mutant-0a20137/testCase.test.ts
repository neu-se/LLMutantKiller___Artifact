import Q from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.join', () => {
    it('should throw an error when promises do not resolve to the same value', () => {
        const promise1 = Q(1);
        const promise2 = Q(2);
        expect(() => Q.join(promise1, promise2)).toThrowError("Q can't join: not the same: 1 2");
    });
});