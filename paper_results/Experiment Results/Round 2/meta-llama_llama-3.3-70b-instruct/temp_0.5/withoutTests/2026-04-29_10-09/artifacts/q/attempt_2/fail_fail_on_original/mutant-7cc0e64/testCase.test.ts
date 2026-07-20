import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle unhandled rejections", () => {
        const promise = Q.defer();
        promise.reject(new Error("Test error"));
        Q.done(promise);
        expect(() => {
            // If Q.done does not throw an error, then the test passes
        }).not.toThrow();
    });
});