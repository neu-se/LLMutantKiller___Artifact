import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should handle process.domain correctly", () => {
        // Create a mock process object without domain property
        const originalProcess = global.process;
        global.process = {
            domain: undefined,
        };

        // Call the done method with a promise and a callback
        const promise = Q.resolve();
        const callback = jest.fn();
        promise.done(callback, undefined, undefined, undefined);

        // Check if no error is thrown
        expect(callback).toHaveBeenCalledTimes(0);

        // Restore the original process object
        global.process = originalProcess;
    });
});