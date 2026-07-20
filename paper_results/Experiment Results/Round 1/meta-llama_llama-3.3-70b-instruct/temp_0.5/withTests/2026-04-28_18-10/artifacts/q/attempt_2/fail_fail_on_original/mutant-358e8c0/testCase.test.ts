import { Q } from "../../../../../q.js";

describe('Promise inspection', () => {
    it('should inspect a promise and return its state', () => {
        const promise = Q(5);
        const snapshot = promise.inspect();
        expect(snapshot.state).toBe('fulfilled');
        expect(snapshot.value).toBe(5);
    });

    it('should inspect a rejected promise and return its state', () => {
        const error = new Error('Test error');
        const promise = Q.reject(error);
        const snapshot = promise.inspect();
        expect(snapshot.state).toBe('rejected');
        expect(snapshot.reason).toBe(error);
    });

    it('should inspect a pending promise and return its state', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const snapshot = promise.inspect();
        expect(snapshot.state).toBe('pending');
        deferred.resolve(5);
    });
});