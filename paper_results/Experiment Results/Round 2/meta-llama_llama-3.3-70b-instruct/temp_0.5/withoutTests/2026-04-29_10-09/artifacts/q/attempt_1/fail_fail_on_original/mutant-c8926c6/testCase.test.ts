import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when environment was not anticipated', () => {
        // Mock the process object to simulate a non-Node environment
        const originalProcess = global.process;
        global.process = undefined;

        expect(() => Q()).toThrowError("This environment was not anticipated by Q. Please file a bug.");

        // Restore the original process object
        global.process = originalProcess;
    });
});