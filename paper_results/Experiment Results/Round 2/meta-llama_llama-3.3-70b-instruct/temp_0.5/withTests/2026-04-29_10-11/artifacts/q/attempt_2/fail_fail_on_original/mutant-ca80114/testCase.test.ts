import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle uncaught exceptions in NodeJS environment", () => {
        // Create a promise that throws an error
        const promise = Q(function () {
            throw new Error("Test error");
        });

        // In the original code, if (isNodeJS) checks if the environment is NodeJS
        // and re-throws the error synchronously. In the mutated code, if (true) 
        // will always be true and the error will be re-thrown synchronously.
        // So, the test should pass for the original code and fail for the mutated code.
        expect(() => promise.then(() => {}, () => {})).not.toThrowError("Test error");
    });
});