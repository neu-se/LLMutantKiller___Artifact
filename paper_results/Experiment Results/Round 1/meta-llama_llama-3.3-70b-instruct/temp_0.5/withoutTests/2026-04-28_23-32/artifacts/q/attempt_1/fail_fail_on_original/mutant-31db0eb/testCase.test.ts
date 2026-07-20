import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should use setImmediate if available in a non-Node environment', () => {
        // Create a mock for the setImmediate function
        const originalSetImmediate = global.setImmediate;
        const mockSetImmediate = jest.fn();
        global.setImmediate = mockSetImmediate;

        // Create a mock for the process object
        const originalProcess = global.process;
        const mockProcess = { nextTick: jest.fn() };
        global.process = mockProcess;

        // Create a mock for the window object
        const originalWindow = global.window;
        const mockWindow = {};
        global.window = mockWindow;

        // Call the Q function to test its behavior
        Q.defer();

        // Check if setImmediate was called
        expect(mockSetImmediate).toHaveBeenCalledTimes(1);

        // Restore the original functions
        global.setImmediate = originalSetImmediate;
        global.process = originalProcess;
        global.window = originalWindow;
    });
});