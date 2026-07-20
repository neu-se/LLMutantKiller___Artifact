import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('unhandled rejection tracking', () => {
    it('should report unhandled rejections', () => {
        var deferred = Q.defer();
        var promise = deferred.promise;
        Q.reject('test');
        Q.nextTick.runAfter(function () {
            process.emit('unhandledRejection', 'test', promise);
        });
        expect(Q.getUnhandledReasons()).toEqual(['(no stack) test']);
    });
});