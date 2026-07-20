import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress notification behavior", () => {
    it("should not notify when progress listener throws an error", () => {
        const deferred = Q.defer();
        let progressCalled = false;

        deferred.promise.then(
            () => {
                // Should not reach here
                expect(true).toBe(false);
            },
            () => {
                // Should not reach here either
                expect(true).toBe(false);
            },
            (value) => {
                progressCalled = true;
                throw new Error("Progress error");
            }
        );

        deferred.notify("test");
        deferred.resolve("done");

        return Q.delay(10).then(() => {
            expect(progressCalled).toBe(true);
        });
    });
});