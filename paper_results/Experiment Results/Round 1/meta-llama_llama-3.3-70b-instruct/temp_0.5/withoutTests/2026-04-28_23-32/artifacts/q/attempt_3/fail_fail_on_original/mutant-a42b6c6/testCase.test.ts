import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.defer', () => {
    it('should call the reject function when an error is passed to the makeNodeResolver', () => {
        const deferred = Q.defer();
        const rejectSpy = jest.fn();
        const originalReject = deferred.reject;
        deferred.reject = rejectSpy;
        const error = new Error('Test error');
        deferred.makeNodeResolver()(error, null, null);
        expect(rejectSpy).toHaveBeenCalledTimes(1);
        expect(rejectSpy).toHaveBeenCalledWith(error);
        deferred.reject = originalReject;
    });
});