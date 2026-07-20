import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call setImmediate if window is defined and setImmediate is available', () => {
        // Create a mock for the setImmediate function
        const originalSetImmediate = global.setImmediate;
        const mockSetImmediate = jest.fn();
        global.setImmediate = mockSetImmediate;

        // Call the Q function to test its behavior
        Q.defer();

        // Check if setImmediate was called
        expect(mockSetImmediate).toHaveBeenCalledTimes(1);

        // Restore the original functions
        global.setImmediate = originalSetImmediate;
    });
});