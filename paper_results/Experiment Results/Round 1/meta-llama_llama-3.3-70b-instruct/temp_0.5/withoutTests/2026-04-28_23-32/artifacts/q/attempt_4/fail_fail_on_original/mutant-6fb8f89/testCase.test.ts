import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Promise.prototype.spread', () => {
    it('should call the fulfilled callback with the values of the promised array', () => {
        const promise = Q([1, 2, 3]);
        const fulfilledSpy = jest.fn();
        const rejectedSpy = jest.fn();

        promise.spread(fulfilledSpy, rejectedSpy);

        expect(fulfilledSpy).toHaveBeenCalledTimes(1);
        expect(fulfilledSpy).toHaveBeenCalledTimes(1);
        expect(fulfilledSpy.mock.calls[0].length).toBe(3);
    });
});