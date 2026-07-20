import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should not call the progress listener when the promise is already resolved", () => {
        const deferred = Q.defer();
        const progressListener = jest.fn();
        deferred.promise.progress(progressListener);
        deferred.resolve("resolved value");
        expect(progressListener).not.toHaveBeenCalled();
    });
});