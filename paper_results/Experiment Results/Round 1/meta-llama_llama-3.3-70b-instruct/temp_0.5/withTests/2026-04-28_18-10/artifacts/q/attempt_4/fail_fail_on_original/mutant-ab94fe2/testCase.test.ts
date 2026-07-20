import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should handle done method", () => {
        const promise = Q.reject(new Error("Test error"));
        const onUnhandledError = jest.fn();
        Q.onerror = onUnhandledError;
        promise.done();
        expect(promise.isRejected()).toBe(true);
    });
});