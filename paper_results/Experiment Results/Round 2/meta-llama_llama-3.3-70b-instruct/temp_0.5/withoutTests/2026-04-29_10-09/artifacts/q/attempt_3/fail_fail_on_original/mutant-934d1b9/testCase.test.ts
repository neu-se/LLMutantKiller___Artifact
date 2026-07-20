import { Q } from "../../../q";

describe('Q.defer', () => {
    it('should notify progress listeners when notify is called on the deferred object', () => {
        const deferred = Q.defer();
        const progressListener = jest.fn();
        deferred.promise.progress(progressListener);
        deferred.notify('progress');
        expect(progressListener).toHaveBeenCalledTimes(1);
        expect(progressListener).toHaveBeenCalledWith('progress');
    });
});