import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not call setImmediate if window is undefined', () => {
        // Create a mock for the window object
        const originalWindow = global.window;
        global.window = undefined;

        // Create a mock for the setImmediate function
        const originalSetImmediate = global.setImmediate;
        const mockSetImmediate = jest.fn();
        global.setImmediate = mockSetImmediate;

        // Call the Q function to test its behavior
        Q.defer();

        // Check if setImmediate was not called
        expect(mockSetImmediate).not.toHaveBeenCalled();

        // Restore the original functions
        global.window = originalWindow;
        global.setImmediate = originalSetImmediate;
    });
});