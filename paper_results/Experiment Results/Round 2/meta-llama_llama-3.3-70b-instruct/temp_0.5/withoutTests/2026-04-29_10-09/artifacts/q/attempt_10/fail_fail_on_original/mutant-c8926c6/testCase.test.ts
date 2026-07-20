import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when process.toString returns "[object process]" but process.nextTick is not defined', () => {
        // Mock the process object to simulate a Node environment
        const originalProcess = global.process;
        global.process = {
            nextTick: undefined,
            toString: () => "[object process]",
            cwd: jest.fn(),
            exit: jest.fn(),
            // Add other necessary process properties here
        };

        expect(() => Q(1)).toThrowError("This environment was not anticipated by Q. Please file a bug.");

        // Restore the original process object
        global.process = originalProcess;
    });
});