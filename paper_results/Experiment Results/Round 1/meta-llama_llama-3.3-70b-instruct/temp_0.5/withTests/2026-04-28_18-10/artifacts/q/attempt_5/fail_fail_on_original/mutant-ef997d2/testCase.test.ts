import { Q } from '../../q.js';

describe('Promise', () => {
    it('should inspect a promise and return its state', () => {
        const promise = Q(10);
        expect(promise.inspect).not.toBeUndefined();
    });
});