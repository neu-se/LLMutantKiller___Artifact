import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should add progress listeners when "when" operation is used with a progress operand', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const progressListener = jest.fn();
        deferred.resolve();
        promise.then(null, null, progressListener);
        deferred.notify('progress');
        expect(progressListener).toHaveBeenCalledTimes(1);
        expect(progressListener).toHaveBeenCalledWith('progress');
    });
});