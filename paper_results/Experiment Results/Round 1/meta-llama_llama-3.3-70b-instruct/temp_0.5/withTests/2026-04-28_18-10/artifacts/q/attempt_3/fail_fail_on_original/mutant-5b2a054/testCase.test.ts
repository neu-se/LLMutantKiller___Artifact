import { Q } from '../../../q.js';

describe('Q', () => {
    it('should test the behavior of the mutated file', () => {
        const error = new Error('Test error');
        const promise = Q.reject(error);
        const spy = jest.fn();
        Q.onerror = spy;
        promise.catch(() => {
            throw error;
        });
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(error);
    });
});