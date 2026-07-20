import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle window and self correctly', () => {
        // Set up the environment
        const originalWindow = global.window;
        const originalSelf = global.self;

        // Set window to {} and self to {}
        global.window = {};
        global.self = {};

        // Test the Q function
        const q = Q();

        // Check if the Q function was defined correctly
        expect(q).toBeDefined();

        // Restore the original window and self
        global.window = originalWindow;
        global.self = originalSelf;
    });

    it('should throw an error when both window and self are undefined', () => {
        // Set up the environment
        const originalWindow = global.window;
        const originalSelf = global.self;

        // Set window to undefined and self to undefined
        global.window = undefined;
        global.self = undefined;

        // This should throw an error in the mutated code
        expect(() => Q()).toThrowError("This environment was not anticipated by Q. Please file a bug.");

        // Restore the original window and self
        global.window = originalWindow;
        global.self = originalSelf;
    });
});