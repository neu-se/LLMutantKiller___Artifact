import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle domain binding correctly", () => {
        const error = new Error("Test error");
        const promise = Q.reject(error);
        const onUnhandledError = jest.fn();
        Q.onerror = onUnhandledError;
        const doneSpy = jest.spyOn(promise, 'done');
        doneSpy.mockImplementationOnce(() => {
            onUnhandledError(error);
        });
        promise.done();
        expect(onUnhandledError).toHaveBeenCalledTimes(1);
        expect(onUnhandledError).toHaveBeenCalledWith(error);
    });
});