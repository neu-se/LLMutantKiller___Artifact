import { Q } from "../../../../../q.js";

describe('Q.defer', () => {
    it('should reject the promise when an error is passed to the resolver', () => {
        const deferred = Q.defer();
        const error = new Error('Test error');
        deferred.reject(error);
        return deferred.promise.then(() => {
            throw new Error('Promise should have been rejected');
        }).catch((err: any) => {
            expect(err).toBe(error);
        });
    });
});