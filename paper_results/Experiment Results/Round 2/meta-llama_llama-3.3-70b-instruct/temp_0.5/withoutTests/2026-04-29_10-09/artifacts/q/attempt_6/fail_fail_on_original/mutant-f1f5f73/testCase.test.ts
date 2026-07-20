import * as Q from '../q';

describe('Q.tap', () => {
    it('should call the callback with the value of the promise', () => {
        const callback = jest.fn();
        const promise = Q(42);
        Q(promise).tap(callback);
        expect(callback).toHaveBeenCalledTimes(1);
    });
});