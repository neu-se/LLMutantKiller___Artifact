import { Q } from '../../../q.js';

describe('Q promise', () => {
    it('should add progress listeners when "when" is called with a progress operand', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const progressListener = jest.fn();

        promise.progress(progressListener);
        deferred.notify('test');
        expect(progressListener).toHaveBeenCalledTimes(1);
        expect(progressListener).toHaveBeenCalledWith('test');
    });
});