import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not throw an error when process.nextTick is defined', () => {
        // Mock the process object to simulate a Node environment
        const originalProcess = global.process;
        const nextTickSpy = jest.fn();
        global.process = {
            nextTick: nextTickSpy,
            cwd: jest.fn(),
            exit: jest.fn(),
            // Add other necessary process properties here
        };

        expect(() => Q(1)).not.toThrow();

        // Restore the original process object
        global.process = originalProcess;
    });
});