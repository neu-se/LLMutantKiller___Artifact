import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call nextTick if window is undefined and process is defined', () => {
        // Create a mock for the window object
        const originalWindow = global.window;
        global.window = undefined;

        // Create a mock for the process object
        const originalProcess = global.process;
        const mockProcess = { nextTick: jest.fn() };
        global.process = mockProcess;

        // Create a mock for the setImmediate function
        const originalSetImmediate = global.setImmediate;
        const mockSetImmediate = jest.fn();
        global.setImmediate = mockSetImmediate;

        // Call the Q function to test its behavior
        Q.defer();

        // Check if nextTick was called
        expect(mockProcess.nextTick).toHaveBeenCalledTimes(1);

        // Check if setImmediate was not called
        expect(mockSetImmediate).not.toHaveBeenCalled();

        // Restore the original functions
        global.window = originalWindow;
        global.process = originalProcess;
        global.setImmediate = originalSetImmediate;
    });
});