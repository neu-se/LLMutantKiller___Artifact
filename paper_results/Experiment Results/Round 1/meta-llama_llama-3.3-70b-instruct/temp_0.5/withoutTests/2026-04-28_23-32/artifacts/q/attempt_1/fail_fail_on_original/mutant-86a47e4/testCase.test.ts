import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise', () => {
    it('should call progress listener when progress is notified', () => {
        let progressCalled = false;
        const deferred = Q.defer();
        const promise = deferred.promise;
        promise.then(void 0, void 0, () => {
            progressCalled = true;
        });
        deferred.notify();
        expect(progressCalled).toBe(true);
    });
});