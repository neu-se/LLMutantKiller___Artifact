import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress callback in promise chain", () => {
    it("should call progress callback with correct value when provided", (done) => {
        const deferred = Q.defer();
        let progressValue: any = null;

        const promise = deferred.promise.then(
            () => {
                // Should not reach here without resolution
                expect(true).toBe(false);
            },
            () => {
                // Should not reach here without rejection
                expect(true).toBe(false);
            },
            (value: any) => {
                progressValue = value;
            }
        );

        deferred.notify("test-progress");
        deferred.resolve("resolved");

        setTimeout(() => {
            expect(progressValue).toBe("test-progress");
            done();
        }, 50);
    });
});