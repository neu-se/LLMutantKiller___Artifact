import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.defer', () => {
    it('should reject the promise when an error is passed to the makeNodeResolver', () => {
        const deferred = Q.defer();
        const error = new Error('Test error');
        const rejectSpy = jest.fn();
        deferred.reject = rejectSpy;
        deferred.makeNodeResolver()(error, null, null);
        expect(rejectSpy).toHaveBeenCalledTimes(1);
        expect(rejectSpy).toHaveBeenCalledWith(error);
    });
});