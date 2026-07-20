import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise", () => {
    it("should call progress listener when promise is pending", () => {
        const deferred = Q.defer();
        const progressListener = jest.fn();
        const promise = deferred.promise;

        promise.then(null, null, progressListener);
        deferred.notify("progress");

        expect(progressListener).toHaveBeenCalledTimes(1);
        expect(progressListener).toHaveBeenCalledWith("progress");

        // Add a check to verify that the progress listener is called
        // when the promise is pending
        deferred.notify("another progress");
        expect(progressListener).toHaveBeenCalledTimes(2);
        expect(progressListener).toHaveBeenCalledWith("another progress");
    });
});