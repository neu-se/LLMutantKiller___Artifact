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

        // If the mutation is present, the progress listener should not be called
        // the second time
        deferred.notify("another progress");
        expect(progressListener).toHaveBeenCalledTimes(2);
    });

    it("should not call progress listener when mutation is present", () => {
        const deferred = Q.defer();
        const progressListener = jest.fn();
        const promise = deferred.promise;

        // Simulate the mutation by not calling the progress listener
        promise.then(null, null, () => {});

        deferred.notify("progress");

        expect(progressListener).not.toHaveBeenCalled();
    });
});