import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should add progress listeners when "when" operation is used with a progress operand', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const progressListener = jest.fn();
        promise.promiseDispatch(null, "when", [null, progressListener]);
        expect(deferred.notify).toHaveBeenCalledTimes(0);
        deferred.notify('progress');
        expect(progressListener).toHaveBeenCalledTimes(1);
        expect(progressListener).toHaveBeenCalledWith('progress');
    });
});