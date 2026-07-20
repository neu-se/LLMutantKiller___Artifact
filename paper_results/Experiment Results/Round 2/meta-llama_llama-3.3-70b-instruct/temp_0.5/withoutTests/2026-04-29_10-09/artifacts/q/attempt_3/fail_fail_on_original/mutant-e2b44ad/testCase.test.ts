import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not throw an error when process is an object", () => {
        // Create a mock process object
        const originalProcess = global.process;
        global.process = { domain: {} };

        // Call the done method to test the behavior
        const promise = Q.resolve();
        promise.done(() => {}, () => {}, () => {});

        // Restore the original process object
        global.process = originalProcess;
    });
});