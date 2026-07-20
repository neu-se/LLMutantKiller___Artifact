import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should add progress listeners when "when" is called with a progress operand', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const progressListener = jest.fn();

        promise.then(null, null, progressListener);
        deferred.notify('test');
        expect(progressListener).toHaveBeenCalledTimes(1);
        expect(progressListener).toHaveBeenCalledWith('test');

        // Mutated code will not call progressListener, so this test will fail on mutated code
        expect(progressListener.mock.calls.length).toBe(1);
    });
});