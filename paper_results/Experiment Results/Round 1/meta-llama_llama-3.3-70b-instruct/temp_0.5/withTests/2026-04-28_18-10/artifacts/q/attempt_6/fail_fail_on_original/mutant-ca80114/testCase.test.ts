import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle exceptions in Node.js', () => {
        const deferred = q.defer();
        const promise = deferred.promise;
        const error = new Error('Test error');
        q.nextTick(function () {
            throw error;
        });
        return promise.then(() => {
            throw new Error('This should not be reached');
        }).catch((e: any) => {
            expect(e).not.toBe(error);
        });
    });
});