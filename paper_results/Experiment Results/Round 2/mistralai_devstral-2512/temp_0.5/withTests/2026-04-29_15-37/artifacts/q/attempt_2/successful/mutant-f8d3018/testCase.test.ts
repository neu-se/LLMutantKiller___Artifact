import { defer } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress callback in then", () => {
    it("should call progress callback with the provided value", (done) => {
        const deferred = defer();
        let progressValue: any = null;

        const promise = deferred.promise.then(
            () => { /* fulfillment handler */ },
            () => { /* rejection handler */ },
            (value: any) => {
                progressValue = value;
                return value;
            }
        );

        deferred.notify("test-progress-value");
        deferred.resolve();

        setTimeout(() => {
            expect(progressValue).toBe("test-progress-value");
            done();
        }, 10);
    });
});