import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should not throw an error when a progress listener does not throw", () => {
        const deferred = q.defer();
        const promise = q.when(deferred.promise, null, null, () => {
            // do nothing
        });
        deferred.notify();
        deferred.resolve();
        return promise.then(() => {
            // no error should be thrown
        });
    });
});