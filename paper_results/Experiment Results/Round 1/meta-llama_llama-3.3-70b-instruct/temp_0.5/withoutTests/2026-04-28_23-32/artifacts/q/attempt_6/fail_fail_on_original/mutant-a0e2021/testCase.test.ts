import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should enable long stack support when Q_DEBUG is set in the process environment and process is an object', () => {
        // Set up the environment
        process.env.Q_DEBUG = 'true';

        // Create a new instance of Q
        const q = Q;

        // Check if long stack support is enabled
        expect(q.longStackSupport).toBe(true);
    });

    it('should throw an error when process is not an object and Q_DEBUG is set', () => {
        // Set up the environment
        process.env.Q_DEBUG = 'true';
        const originalProcess = globalThis.process;
        globalThis.process = null;

        // Create a new instance of Q
        expect(() => Q()).toThrowError('This environment was not anticipated by Q. Please file a bug.');

        // Restore the original process
        globalThis.process = originalProcess;
    });
});