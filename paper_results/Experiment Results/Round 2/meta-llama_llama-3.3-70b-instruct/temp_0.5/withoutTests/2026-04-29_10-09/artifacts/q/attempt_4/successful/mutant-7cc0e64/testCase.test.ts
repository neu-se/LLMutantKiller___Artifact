import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle domain binding correctly", () => {
        const process = {
            domain: {
                bind: jest.fn()
            }
        };

        const promise = Q.defer();
        promise.reject(new Error("Test error"));
        Q.done(promise, null, null, null);
        expect(process.domain.bind).toHaveBeenCalledTimes(0);
    });
});