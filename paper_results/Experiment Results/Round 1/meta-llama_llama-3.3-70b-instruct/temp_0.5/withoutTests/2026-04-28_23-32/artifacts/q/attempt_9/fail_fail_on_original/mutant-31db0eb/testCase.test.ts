import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call process.nextTick if window is undefined and process is defined', () => {
        // Save the original window object
        const originalWindow = global.window;

        // Set the window object to undefined
        Object.defineProperty(global, 'window', { value: undefined, configurable: true });

        // Create a mock for the process object
        const originalProcess = global.process;
        const mockProcess = {
            nextTick: jest.fn(),
            toString: () => '[object process]',
            next: jest.fn(),
            domain: undefined,
        };
        global.process = mockProcess;

        // Call the Q function to test its behavior
        Q.defer();

        // Check if process.nextTick was called
        expect(mockProcess.nextTick).toHaveBeenCalledTimes(1);

        // Restore the original functions
        global.window = originalWindow;
        global.process = originalProcess;
    });
});