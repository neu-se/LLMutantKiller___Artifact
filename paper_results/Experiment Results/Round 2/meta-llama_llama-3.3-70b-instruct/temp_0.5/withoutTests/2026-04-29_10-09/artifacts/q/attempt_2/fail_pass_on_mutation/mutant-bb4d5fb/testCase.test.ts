import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should correctly filter internal frames from stack traces", () => {
        // Create a new promise that will be rejected
        const promise = Q.reject(new Error("Test error"));

        // Make sure the promise is rejected
        promise.then(() => {
            throw new Error("Promise was not rejected");
        }, (error) => {
            expect(error.message).toBe("Test error");
        });
    });
});