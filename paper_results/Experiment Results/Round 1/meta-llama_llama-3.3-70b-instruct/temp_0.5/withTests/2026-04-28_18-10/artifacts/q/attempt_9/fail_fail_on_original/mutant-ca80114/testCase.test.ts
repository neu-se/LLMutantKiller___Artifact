import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle exceptions in Node.js', () => {
        const deferred = q.defer();
        const promise = deferred.promise;
        q.nextTick(function () {
            if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'browser') {
                deferred.reject(new Error('Test error'));
            } else {
                deferred.resolve();
            }
        });
        return promise.then(() => {
            expect(true).toBe(true);
        }).catch((e: any) => {
            expect(e.message).not.toBe('Test error');
        });
    });
});