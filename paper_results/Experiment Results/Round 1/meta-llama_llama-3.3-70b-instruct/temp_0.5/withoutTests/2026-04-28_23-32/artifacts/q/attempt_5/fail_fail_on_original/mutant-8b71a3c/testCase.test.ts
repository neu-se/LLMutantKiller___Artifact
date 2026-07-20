import { Q } from './q.js';

describe('Q Promise', () => {
    it('should handle pending promises correctly', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const inspected = promise.inspect();
        expect(inspected.state).toBe('pending');
        const valueOfResult = promise.valueOf();
        expect(valueOfResult).toBe(promise);
        deferred.resolve('test');
        return Q(promise).then((value: string) => {
            expect(value).toBe('test');
        });
    });
});