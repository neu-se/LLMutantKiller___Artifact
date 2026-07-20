import { Q } from "../../../../../q.js";

describe('Q.defer', () => {
    it('should call reject when error is passed to makeNodeResolver', () => {
        const deferred = Q.defer();
        const error = new Error('Test error');
        const rejectSpy = jest.fn(deferred.reject);
        deferred.makeNodeResolver()(error, null, null);
        expect(rejectSpy).toHaveBeenCalledTimes(0);
    });
});