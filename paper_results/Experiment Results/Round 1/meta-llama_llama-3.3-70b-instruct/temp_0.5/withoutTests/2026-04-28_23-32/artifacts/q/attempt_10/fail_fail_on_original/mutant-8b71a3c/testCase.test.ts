import { Q } from '../../../q';

describe('Q Promise', () => {
    it('should handle pending promises correctly', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const inspected = promise.inspect();
        expect(inspected.state).toBe('pending');
        const valueOfResult = promise.valueOf();
        expect(valueOfResult).toBe(promise);
        deferred.resolve('test');
        expect(promise.valueOf()).toBe('test');
    });
});