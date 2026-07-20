import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle uncaught exceptions in NodeJS environment", () => {
        const isNodeJS = typeof process !== 'undefined' && process.versions.node;

        // Create a promise that throws an error
        const promise = Q(function () {
            throw new Error("Test error");
        });

        if (isNodeJS) {
            // In NodeJS environment, the error should be re-thrown synchronously
            expect(() => promise.then(() => {}, () => {})).toThrowError("Test error");
        } else {
            // In non-NodeJS environment, the error should not be re-thrown synchronously
            expect(() => promise.then(() => {}, () => {})).not.toThrowError("Test error");
        }
    });
});