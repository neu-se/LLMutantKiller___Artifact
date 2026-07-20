describe('Q', () => {
    it('should handle window and self correctly', () => {
        // Load the q module
        const q = require('../../../../../../../../../subject_repositories/q/q.js');

        // Set the global window and self
        (global as any).window = undefined;
        (global as any).self = { Q: undefined };

        // Call the Q function
        q();

        // Check if the correct object was used
        expect((global as any).self.Q).toBeDefined();
    });
});