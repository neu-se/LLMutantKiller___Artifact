import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should throw an error when an unhandled rejection occurs in a browser environment", () => {
        const error = new Error("Test error");
        const promise = Q.reject(error);
        const originalOnError = Q.onerror;
        Q.onerror = jest.fn();
        promise.then(null, null);
        expect(Q.onerror).toHaveBeenCalledTimes(1);
        expect(Q.onerror).toHaveBeenCalledWith(error);
        Q.onerror = originalOnError;
    });
});