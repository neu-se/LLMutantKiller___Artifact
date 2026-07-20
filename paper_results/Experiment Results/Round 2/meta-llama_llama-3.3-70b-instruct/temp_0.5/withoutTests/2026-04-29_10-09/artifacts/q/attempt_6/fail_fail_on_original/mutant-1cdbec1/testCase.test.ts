import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle window and self correctly', () => {
        // Set up the environment
        const originalWindow = global.window;
        const originalSelf = global.self;

        // Set window to {} and self to undefined
        global.window = {};
        global.self = undefined;

        // Test the Q function
        const q = Q();

        // Check if the Q function was defined correctly
        expect(q).toBeDefined();

        // Restore the original window and self
        global.window = originalWindow;
        global.self = originalSelf;
    });
});