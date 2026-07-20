import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should call the error handler when a progress listener throws", () => {
        const deferred = q.defer();
        const error = new Error("Test error");
        const promise = q.when(deferred.promise, null, null, () => {
            throw error;
        });
        deferred.notify();
        deferred.resolve();
        let errorCaught = false;
        promise.catch((e: any) => {
            errorCaught = true;
            expect(e).toBe(error);
        });
        expect(errorCaught).toBe(true);
    });
});