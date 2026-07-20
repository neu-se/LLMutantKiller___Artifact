import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle uncaught exceptions in Node.js', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const error = new Error('Test error');
        Q.nextTick(function () {
            throw error;
        });
        promise.then(null, function (e) {
            expect(e).toBe(error);
        });
    });
});