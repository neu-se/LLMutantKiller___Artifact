import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress notification behavior", () => {
    it("should call progress listeners when notify is called with a value", (done) => {
        const deferred = Q.defer();
        let progressCalled = false;
        let progressValue: any = null;

        Q.when(deferred.promise, null, null, (value: any) => {
            progressCalled = true;
            progressValue = value;
        });

        deferred.notify("test");
        deferred.resolve();

        setTimeout(() => {
            expect(progressCalled).toBe(true);
            expect(progressValue).toBe("test");
            done();
        }, 10);
    });
});