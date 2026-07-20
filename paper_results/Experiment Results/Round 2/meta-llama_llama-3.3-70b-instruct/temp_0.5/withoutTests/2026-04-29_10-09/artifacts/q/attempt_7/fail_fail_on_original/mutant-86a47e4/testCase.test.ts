import { Q } from "./q";

describe("Q promise", () => {
    it("should call progress listener when promise is pending", () => {
        const deferred = Q.defer();
        const progressListener = jest.fn();
        const promise = deferred.promise;

        promise.then(null, null, progressListener);
        deferred.notify("progress");

        expect(progressListener).toHaveBeenCalledTimes(1);
        expect(progressListener).toHaveBeenCalledWith("progress");
    });
});