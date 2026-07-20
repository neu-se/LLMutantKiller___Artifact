import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle rejectionHandled event correctly', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const spy = jest.fn();
        process.emit = spy;
        deferred.reject(new Error());
        Q.nextTick.runAfter(() => {
            Q.untrackRejection(promise);
        });
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('rejectionHandled', expect.any(Error), promise);
    });
});