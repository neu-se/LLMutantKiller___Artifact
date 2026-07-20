import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should enable long stack support when Q_DEBUG is set in the process environment', () => {
        // Set up the environment
        process.env.Q_DEBUG = 'true';

        // Create a new instance of Q
        const q = Q;

        // Check if long stack support is enabled
        expect(q.longStackSupport).toBe(true);
    });

    it('should not enable long stack support when process is not an object', () => {
        // Set up the environment
        const originalProcess = globalThis.process;
        globalThis.process = {};

        // Create a new instance of Q
        const q = Q;

        // Check if long stack support is enabled
        expect(q.longStackSupport).toBe(false);

        // Restore the original process
        globalThis.process = originalProcess;
    });
});