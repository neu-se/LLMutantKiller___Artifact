import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should handle unhandled rejection in browsers", () => {
        const error = new Error("Test error");
        const promise = Q.reject(error);
        const originalOnError = Q.onerror;
        Q.onerror = jest.fn();
        promise.then(() => {}, () => {
            throw error;
        });
        expect(Q.onerror).toHaveBeenCalledTimes(1);
        Q.onerror = originalOnError;
    });
});