import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Promise.prototype.spread', () => {
    it('should call the fulfilled callback with the values of the promised array', () => {
        const promise = Q([1, 2, 3]);
        const fulfilledSpy = jest.fn();
        const rejectedSpy = jest.fn();

        promise.spread(fulfilledSpy, rejectedSpy);

        expect(fulfilledSpy).toHaveBeenCalledTimes(1);
        expect(fulfilledSpy).toHaveBeenCalledWith(1, 2, 3);
        expect(rejectedSpy).not.toHaveBeenCalled();
    });

    it('should throw an error when the fulfilled callback is not provided', () => {
        const promise = Q([1, 2, 3]);
        const rejectedSpy = jest.fn();

        expect(() => promise.spread(undefined, rejectedSpy)).toThrowError();
    });
});