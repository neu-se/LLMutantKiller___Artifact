import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle uncaught exceptions in NodeJS environment", () => {
        // Create a promise that throws an error
        const promise = Q(function () {
            throw new Error("Test error");
        });

        // The original code checks if the environment is NodeJS and re-throws the error synchronously.
        // The mutated code always re-throws the error synchronously.
        // So, the test should pass for the original code (no error thrown) and fail for the mutated code (error thrown).
        expect(() => promise.then(() => {}, () => {})).toThrowError("Test error");
    });
});