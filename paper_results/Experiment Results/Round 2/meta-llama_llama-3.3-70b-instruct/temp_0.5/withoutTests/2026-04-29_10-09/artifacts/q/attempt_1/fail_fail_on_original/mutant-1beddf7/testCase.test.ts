import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should resolve with the correct value when the resolver function throws an error', () => {
        const deferred = Q.defer();
        const promise = Q.promise((resolve, reject, notify) => {
            throw new Error('Test error');
        });
        const error = new Error('Test error');
        promise.then(() => {
            throw new Error('Should not be called');
        }, (reason) => {
            expect(reason).toBe(error);
        });
        deferred.reject(error);
    });
});