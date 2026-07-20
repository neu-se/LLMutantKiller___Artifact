import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        const promise = Q(1);
        const onUnhandledError = jest.fn();
        const originalDone = Q.done;
        Q.done = function(promise, fulfilled, rejected, progress) {
            onUnhandledError();
            originalDone.call(Q, promise, fulfilled, rejected, progress);
        };
        promise.done();
        expect(onUnhandledError).toHaveBeenCalledTimes(1);
    });
});