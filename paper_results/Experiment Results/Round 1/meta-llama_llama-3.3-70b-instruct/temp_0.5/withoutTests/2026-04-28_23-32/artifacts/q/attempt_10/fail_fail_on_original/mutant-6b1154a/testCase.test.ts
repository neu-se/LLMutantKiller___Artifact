import { Q } from '../../q.js';

describe('Q promise library', () => {
    it('should handle done method correctly', () => {
        var promise = Q(true);
        var fulfilledSpy = jest.fn();
        var rejectedSpy = jest.fn();
        promise.done(fulfilledSpy, rejectedSpy);
        expect(fulfilledSpy).toHaveBeenCalledTimes(1);
        expect(fulfilledSpy).toHaveBeenCalledWith();
        expect(rejectedSpy).toHaveBeenCalledTimes(0);
    });
});