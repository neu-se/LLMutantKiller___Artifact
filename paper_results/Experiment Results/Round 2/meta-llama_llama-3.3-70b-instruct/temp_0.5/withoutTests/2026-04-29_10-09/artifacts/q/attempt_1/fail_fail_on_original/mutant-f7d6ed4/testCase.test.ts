import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise Library", () => {
    it("should handle process.domain correctly", () => {
        // Create a new Q promise
        const promise = Q.resolve();

        // Define a custom error handler
        const errorHandler = jest.fn();

        // Set the error handler
        Q.onerror = errorHandler;

        // Try to access process.domain
        try {
            // If process.domain is not undefined, it should not throw an error
            if (typeof process === "object" && process && process.domain) {
                promise.done();
            } else {
                throw new Error("Process domain is not defined");
            }
        } catch (error) {
            // If an error is thrown, the error handler should be called
            expect(errorHandler).toHaveBeenCalledTimes(1);
        }

        // If process.domain is undefined, it should not throw an error
        delete process.domain;
        promise.done();
        expect(errorHandler).toHaveBeenCalledTimes(1);
    });
});