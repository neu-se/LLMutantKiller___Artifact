import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise', () => {
    it('should call progress listener when progress is notified', () => {
        let progressCalled = false;
        const deferred = Q.defer();
        const promise = deferred.promise;
        promise.then(void 0, void 0, (progress) => {
            progressCalled = true;
        });
        deferred.notify('test');
        Q.nextTick(() => {
            expect(progressCalled).toBe(true);
        });
    });
});