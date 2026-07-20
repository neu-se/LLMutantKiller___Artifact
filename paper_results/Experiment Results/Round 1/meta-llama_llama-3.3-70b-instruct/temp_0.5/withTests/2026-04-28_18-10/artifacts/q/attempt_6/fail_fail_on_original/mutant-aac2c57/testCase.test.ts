import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle process and domain correctly", () => {
        // Create a promise that will be resolved in the next tick
        const promise = Q(10);

        // Check if process is an object and has a domain property
        const hasDomain = (typeof process === "object" && process && process.domain);

        // Simulate a browser environment by setting process to null
        const originalProcess = global.process;
        global.process = null;

        // Check if the Q library throws an error when process is null
        expect(() => {
            // Create a promise that will be resolved in the next tick
            const promise = Q(10);
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");

        // Restore the original process
        global.process = originalProcess;

        // If the Q library throws an error when process is null, the test should pass
        expect(hasDomain).toBe(true);

        // Return the promise to ensure the test waits for it to resolve
        return promise;
    });
});