import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle uncaught exceptions in NodeJS environment", () => {
        // Create a promise that throws an error
        const promise = Q(function () {
            throw new Error("Test error");
        });

        // In NodeJS environment, uncaught exceptions are considered fatal errors
        // and should be re-thrown synchronously to interrupt flushing
        expect(() => promise.then(() => {}, () => {})).toThrowError("Test error");
    });
});