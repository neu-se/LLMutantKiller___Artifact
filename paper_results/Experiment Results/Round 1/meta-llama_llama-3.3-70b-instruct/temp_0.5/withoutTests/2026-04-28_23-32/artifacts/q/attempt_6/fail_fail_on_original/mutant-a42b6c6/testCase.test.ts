import { Q } from "../../../../../q.js";

describe('Q.defer', () => {
    it('should reject the promise when an error is passed to the makeNodeResolver', () => {
        const deferred = Q.defer();
        const error = new Error('Test error');
        const promise = deferred.promise;
        deferred.makeNodeResolver()(error, null, null);
        return promise.then(() => {
            throw new Error('Promise should have been rejected');
        }).catch((err: any) => {
            expect(err).toBe(error);
        });
    });
});