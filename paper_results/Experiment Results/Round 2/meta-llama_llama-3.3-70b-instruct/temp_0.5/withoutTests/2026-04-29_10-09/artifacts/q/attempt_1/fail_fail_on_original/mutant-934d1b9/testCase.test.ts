import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.defer', () => {
    it('should notify progress listeners when notify is called', () => {
        const deferred = Q.defer();
        const progressListener = jest.fn();
        deferred.promise.progress(progressListener);
        deferred.notify('progress');
        expect(progressListener).toHaveBeenCalledTimes(1);
        expect(progressListener).toHaveBeenCalledWith('progress');
    });
});