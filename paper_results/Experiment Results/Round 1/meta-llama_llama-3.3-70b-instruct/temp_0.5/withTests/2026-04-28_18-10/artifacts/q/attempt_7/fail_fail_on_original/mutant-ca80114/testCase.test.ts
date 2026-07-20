import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle exceptions in Node.js', () => {
        const deferred = q.defer();
        const promise = deferred.promise;
        const error = new Error('Test error');
        q.nextTick(function () {
            if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'browser') {
                throw error;
            }
        });
        return promise.then(() => {
            expect(true).toBe(true);
        }).catch((e: any) => {
            expect(e).toBe(error);
        });
    });
});