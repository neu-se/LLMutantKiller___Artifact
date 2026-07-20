import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should throw an error when a progress listener throws", () => {
        const deferred = q.defer();
        const error = new Error("Test error");
        const promise = q.when(deferred.promise, null, null, () => {
            throw error;
        });
        deferred.notify();
        deferred.resolve();
        try {
            promise.then(() => {
                // this line should not be reached
                expect(true).toBe(false);
            });
        } catch (e: any) {
            expect(e).toBe(error);
        }
    });
});