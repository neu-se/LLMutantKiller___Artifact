import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle process object', () => {
        // Check if Q correctly handles the process object
        const originalProcess = global.process;

        // Mock the process object to simulate a non-Node.js environment
        global.process = 'string';

        // Check if Q throws an error when process is not an object
        expect(() => {
            Q();
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");

        // Restore the original process object
        global.process = originalProcess;
    });
});