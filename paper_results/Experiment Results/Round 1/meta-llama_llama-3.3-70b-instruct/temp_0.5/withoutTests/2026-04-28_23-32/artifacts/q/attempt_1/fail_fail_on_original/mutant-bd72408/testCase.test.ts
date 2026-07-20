import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should add progress listeners when "when" is called with a progress operand', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const progressListener = jest.fn();

        promise.promiseDispatch(null, "when", [null, progressListener]);
        expect(deferred.progressListeners).toContain(progressListener);
    });
});