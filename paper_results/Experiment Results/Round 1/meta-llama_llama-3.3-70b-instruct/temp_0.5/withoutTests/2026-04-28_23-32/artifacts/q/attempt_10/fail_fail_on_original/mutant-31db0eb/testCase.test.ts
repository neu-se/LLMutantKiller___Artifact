import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not call setImmediate if window is undefined', () => {
        // Save the original window object
        const originalWindow = global.window;

        // Set the window object to undefined
        Object.defineProperty(global, 'window', { value: undefined, configurable: true });

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