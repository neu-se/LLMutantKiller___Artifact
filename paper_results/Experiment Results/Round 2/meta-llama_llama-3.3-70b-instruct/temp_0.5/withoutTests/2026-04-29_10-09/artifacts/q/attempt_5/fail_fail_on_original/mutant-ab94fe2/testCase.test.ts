import { Q } from '../../q';

describe('Q', () => {
    it('should handle unhandled promise rejections', () => {
        const error = new Error('Test error');
        const promise = Q.reject(error);
        const originalOnError = Q.onerror;
        Q.onerror = jest.fn();
        promise.done();
        expect(Q.onerror).toHaveBeenCalledTimes(1);
        expect(Q.onerror).toHaveBeenCalledWith(error);
        Q.onerror = originalOnError;
    });
});