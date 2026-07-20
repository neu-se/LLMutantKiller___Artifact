import { Q } from '../lib/q.js';

describe('Q promise library', () => {
    it('should handle done method correctly', () => {
        var promise = Q(true);
        var fulfilledSpy = jest.fn();
        var rejectedSpy = jest.fn();
        promise.done(fulfilledSpy, rejectedSpy);
        expect(fulfilledSpy).toHaveBeenCalledTimes(1);
        expect(rejectedSpy).toHaveBeenCalledTimes(0);
    });
});