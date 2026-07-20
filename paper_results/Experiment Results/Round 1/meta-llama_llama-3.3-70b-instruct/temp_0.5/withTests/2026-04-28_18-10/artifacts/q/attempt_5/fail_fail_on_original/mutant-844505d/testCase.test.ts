import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle domain binding correctly", () => {
        const error = new Error("Test error");
        const promise = Q.reject(error);
        const onUnhandledError = jest.fn();
        if (typeof process !== 'undefined' && process.domain) {
            process.domain.bind(onUnhandledError);
        }
        promise.done();
        expect(onUnhandledError).toHaveBeenCalledTimes(1);
        expect(onUnhandledError).toHaveBeenCalledWith(error);
    });
});