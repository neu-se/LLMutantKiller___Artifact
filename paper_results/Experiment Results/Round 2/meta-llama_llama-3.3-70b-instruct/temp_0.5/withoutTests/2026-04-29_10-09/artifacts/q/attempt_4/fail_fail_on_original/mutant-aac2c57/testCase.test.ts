import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should handle process.domain correctly", () => {
        // Create a mock process object with domain property
        const originalProcess = global.process;
        global.process = {
            domain: {},
        };

        // Call the done method with a promise and a callback
        const promise = Q.resolve();
        const callback = jest.fn();
        const error = new Error();
        promise.done(callback, (err) => {
            throw err;
        }, undefined, undefined);

        // Check if the error is thrown
        expect(callback).toHaveBeenCalledTimes(0);

        // Restore the original process object
        global.process = originalProcess;
    });
});