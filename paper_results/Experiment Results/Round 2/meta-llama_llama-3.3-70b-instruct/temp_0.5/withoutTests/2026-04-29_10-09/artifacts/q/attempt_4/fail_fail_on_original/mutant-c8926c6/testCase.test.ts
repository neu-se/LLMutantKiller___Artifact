import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when process.nextTick is not defined and process.toString returns "[object process]"', () => {
        // Mock the process object to simulate a Node environment
        const originalProcess = global.process;
        global.process = {
            nextTick: undefined,
            toString: () => "[object process]",
        };

        expect(() => Q()).toThrowError("This environment was not anticipated by Q. Please file a bug.");

        // Restore the original process object
        global.process = originalProcess;
    });
});