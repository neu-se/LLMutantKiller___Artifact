import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle process object', () => {
        // Check if Q correctly handles the process object
        const originalProcess = global.process;

        // Mock the process object to simulate a non-Node.js environment
        global.process = undefined;

        // Check if Q.longStackSupport is set to false when process is undefined
        expect(Q.longStackSupport).toBe(false);

        // Restore the original process object
        global.process = originalProcess;

        // Mock the process object to simulate a Node.js environment
        global.process = { env: {} };

        // Check if Q.longStackSupport is set to false when Q_DEBUG is not set
        expect(Q.longStackSupport).toBe(false);

        // Set Q_DEBUG to true
        global.process.env.Q_DEBUG = 'true';

        // Check if Q.longStackSupport is set to true when Q_DEBUG is set
        expect(Q.longStackSupport).toBe(true);

        // Restore the original process object
        global.process = originalProcess;
    });
});