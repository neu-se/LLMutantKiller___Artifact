import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle unhandled rejection", () => {
        const error = new Error("Test error");
        const promise = Q.reject(error);
        const onUnhandledError = jest.fn();
        Q.onerror = onUnhandledError;
        promise.done();
        expect(onUnhandledError).toHaveBeenCalledTimes(1);
        expect(onUnhandledError).toHaveBeenCalledWith(error);
    });
});