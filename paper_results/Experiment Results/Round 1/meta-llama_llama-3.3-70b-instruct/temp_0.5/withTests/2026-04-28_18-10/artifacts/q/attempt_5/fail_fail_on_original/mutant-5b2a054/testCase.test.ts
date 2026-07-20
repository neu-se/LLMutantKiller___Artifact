import { Q } from '../../../q.js';

describe('Q', () => {
    it('should test the behavior of the mutated file', () => {
        const error = new Error('Test error');
        const promise = Q.reject(error);
        Q.nextTick(() => {
            throw error;
        });
        expect(() => {
            promise.catch(() => {
                throw error;
            });
        }).toThrowError(error);
    });
});