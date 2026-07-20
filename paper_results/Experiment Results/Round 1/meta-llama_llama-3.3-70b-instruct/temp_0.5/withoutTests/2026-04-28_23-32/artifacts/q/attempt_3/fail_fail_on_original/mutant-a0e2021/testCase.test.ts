import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not enable long stack support when Q_DEBUG is not set in the process environment and process is not an object', () => {
        // Set up the environment
        delete process.env.Q_DEBUG;
        const originalProcess = globalThis.process;
        globalThis.process = undefined;

        // Create a new instance of Q
        const q = Q;

        // Check if long stack support is enabled
        expect(q.longStackSupport).toBe(false);

        // Restore the original process
        globalThis.process = originalProcess;
    });
});