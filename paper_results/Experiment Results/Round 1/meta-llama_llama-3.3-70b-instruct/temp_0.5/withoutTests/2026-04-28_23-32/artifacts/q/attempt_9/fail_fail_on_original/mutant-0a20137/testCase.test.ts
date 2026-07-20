import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.join', () => {
    it('should throw an error when promises do not resolve to the same value', () => {
        const promise1 = Q(1);
        const promise2 = Q(2);
        const result = Q.join(promise1, promise2);
        expect(result).rejects.toThrowError("Q can't join: not the same: 1 2");
    });
});