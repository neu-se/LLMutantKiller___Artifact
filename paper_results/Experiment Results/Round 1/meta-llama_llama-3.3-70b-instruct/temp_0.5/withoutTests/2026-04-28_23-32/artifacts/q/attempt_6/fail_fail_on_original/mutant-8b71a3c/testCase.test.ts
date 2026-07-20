import { Q } from '../../../../../../../../subject_repositories/q/q.js';

describe('Q Promise', () => {
    it('should handle pending promises correctly', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const inspected = promise.inspect();
        expect(inspected.state).toBe('pending');
        deferred.resolve('test');
        return Q(promise).then((value: string) => {
            expect(value).toBe('test');
        });
    });
});