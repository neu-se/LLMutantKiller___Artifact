import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle unhandled rejection", () => {
        const error = new Error("Test error");
        const promise = Q.reject(error);
        const onUnhandledError = jest.fn();
        Q.resetUnhandledRejections();
        Q.stopUnhandledRejectionTracking();
        promise.done();
        expect(Q.getUnhandledReasons()).toEqual([error.stack]);
    });
});