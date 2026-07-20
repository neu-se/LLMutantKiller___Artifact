import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise', () => {
    it('should call progress listener when progress is notified', (done) => {
        let progressCalled = false;
        const deferred = Q.defer();
        const promise = deferred.promise;
        promise.progress((progress) => {
            progressCalled = true;
            done();
        });
        deferred.notify('test');
    });
});