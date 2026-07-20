import { Q } from "../../../q.js";

describe('Q', () => {
    it('should call the progress callback when a promise is pending', () => {
        const progressSpy = jest.fn();
        const promise = Q.defer().promise;
        Q.progress(promise, progressSpy);
        promise.notify('progress');
        expect(progressSpy).toHaveBeenCalledTimes(1);
        expect(progressSpy).toHaveBeenCalledWith('progress');
    });

    it('should not call the progress callback when progress function is empty in mutated code', () => {
        const originalProgress = Q.progress;
        Q.progress = function () {};
        const promise = Q.defer().promise;
        const progressSpy = jest.fn();
        Q.progress(promise, progressSpy);
        promise.notify('progress');
        expect(progressSpy).not.toHaveBeenCalled();
        Q.progress = originalProgress;
    });
});