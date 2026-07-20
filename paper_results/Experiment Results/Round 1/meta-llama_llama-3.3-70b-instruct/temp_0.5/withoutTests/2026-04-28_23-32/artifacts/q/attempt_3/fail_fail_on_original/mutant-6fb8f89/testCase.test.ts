import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Promise.prototype.spread', () => {
    it('should call the fulfilled callback with the values of the promised array', () => {
        const promise = Q([1, 2, 3]);
        const fulfilledSpy = jest.fn((a, b, c) => {
            expect(a).toBe(1);
            expect(b).toBe(2);
            expect(c).toBe(3);
        });
        const rejectedSpy = jest.fn();

        promise.spread(fulfilledSpy, rejectedSpy);

        expect(fulfilledSpy).toHaveBeenCalledTimes(1);
        expect(rejectedSpy).not.toHaveBeenCalled();
    });
});