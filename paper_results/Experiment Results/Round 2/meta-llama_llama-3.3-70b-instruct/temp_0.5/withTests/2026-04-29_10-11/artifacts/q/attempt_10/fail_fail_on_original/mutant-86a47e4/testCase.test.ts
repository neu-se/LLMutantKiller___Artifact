import { Q } from "../../../../../../../q/q.js";

describe('Q promise', () => {
    it('should call progress listener when progress is notified', () => {
        var deferred = Q.defer();
        var progressCalled = false;

        Q.when(deferred.promise, (value: any) => {
            expect(value).toBe(10);
        }, (error: any) => {
            expect(true).toBe(false);
        }, (progress: any) => {
            progressCalled = true;
        });

        deferred.notify();
        deferred.resolve(10);

        return Q.delay(10).then(() => {
            expect(progressCalled).toBe(true);
        });
    });
});