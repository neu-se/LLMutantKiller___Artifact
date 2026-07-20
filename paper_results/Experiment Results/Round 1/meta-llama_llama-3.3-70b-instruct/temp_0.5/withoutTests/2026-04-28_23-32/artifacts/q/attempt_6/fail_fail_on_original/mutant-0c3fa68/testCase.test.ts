import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call the progress callback when a promise is pending', () => {
        const progressSpy = jest.fn();
        const promise = Q.defer().promise;
        Q.progress(promise, progressSpy);
        promise.notify('progress');
        expect(progressSpy).toHaveBeenCalledTimes(1);
        expect(progressSpy).toHaveBeenCalledWith('progress');
    });

    it('should throw an error when progress function is empty in mutated code', () => {
        const originalProgress = Q.progress;
        Q.progress = function () {};
        expect(() => Q.progress(Q.defer().promise, jest.fn())).toThrow();
        Q.progress = originalProgress;
    });
});