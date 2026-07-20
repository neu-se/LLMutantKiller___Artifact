import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle process object', () => {
        // Check if Q correctly handles the process object
        const originalProcess = global.process;

        // Mock the process object to simulate a non-Node.js environment
        global.process = {};

        // Check if Q.longStackSupport is set to false when process is an empty object
        expect(Q.longStackSupport).toBe(false);

        // Restore the original process object
        global.process = originalProcess;
    });
});