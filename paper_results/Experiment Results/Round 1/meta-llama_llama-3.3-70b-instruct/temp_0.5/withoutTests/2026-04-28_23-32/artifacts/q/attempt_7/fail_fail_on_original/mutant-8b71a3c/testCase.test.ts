import { Q } from './q.js';

describe('Q Promise', () => {
    it('should return promise when state is pending', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const inspected = promise.inspect();
        expect(inspected.state).toBe('pending');
        const valueOfResult = promise.valueOf();
        expect(valueOfResult).toBe(promise);
    });

    it('should return value when state is fulfilled', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        deferred.resolve('test');
        const inspected = promise.inspect();
        expect(inspected.state).toBe('fulfilled');
        const valueOfResult = promise.valueOf();
        expect(valueOfResult).toBe('test');
    });
});