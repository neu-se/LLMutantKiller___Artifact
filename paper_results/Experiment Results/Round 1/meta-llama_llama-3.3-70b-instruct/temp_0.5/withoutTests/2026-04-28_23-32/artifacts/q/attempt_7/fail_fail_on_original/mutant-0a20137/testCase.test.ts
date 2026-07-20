import Q from "../../../q.js";

describe('Q.join', () => {
    it('should join two promises with the same value', () => {
        const promise1 = Q(1);
        const promise2 = Q(1);
        expect(Q.join(promise1, promise2)).resolves.toBe(1);
    });

    it('should throw an error when promises do not resolve to the same value', () => {
        const promise1 = Q(1);
        const promise2 = Q(2);
        expect(Q.join(promise1, promise2)).rejects.toThrowError("Q can't join: not the same: 1 2");
    });
});