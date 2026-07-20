import { Q } from '../../../../../../../../subject_repositories/q/q';

describe('Promise', () => {
    it('should inspect a fulfilled promise correctly', () => {
        const promise = Q(10);
        const inspected = promise.inspect();
        expect(inspected.state).toBe('fulfilled');
        expect(inspected.value).toBe(10);
    });

    it('should inspect a rejected promise correctly', () => {
        const error = new Error('Test error');
        const promise = Q.reject(error);
        const inspected = promise.inspect();
        expect(inspected.state).toBe('rejected');
        expect(inspected.reason).toBe(error);
    });

    it('should inspect a pending promise correctly', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const inspected = promise.inspect();
        expect(inspected.state).toBe('pending');
    });
});