import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle rejectionHandled event correctly', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const spy = jest.fn();
        process.emit = spy;
        deferred.reject(new Error());
        Q.nextTick.runAfter(() => {
            try {
                Q.untrackRejection(promise);
            } catch (error) {
                expect(error).toBeInstanceOf(TypeError);
            }
        });
        expect(spy).toHaveBeenCalledTimes(0);
    });
});