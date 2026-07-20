import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should throw an error when a progress listener throws and the error is not caught", () => {
        const deferred = q.defer();
        const error = new Error("Test error");
        const promise = q.when(deferred.promise, null, null, () => {
            throw error;
        });
        deferred.notify();
        deferred.resolve();
        return promise.then(() => {
            expect(true).toBe(false); // this line should not be reached
        }).catch((e) => {
            expect(e).toBe(error);
        });
    });
});