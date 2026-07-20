import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q Promise', () => {
    it('should handle pending promises correctly', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const inspected = promise.inspect();
        expect(inspected.state).toBe('pending');
        deferred.resolve('test');
        Q(promise).then((value) => {
            expect(value).toBe('test');
        });
    });
});