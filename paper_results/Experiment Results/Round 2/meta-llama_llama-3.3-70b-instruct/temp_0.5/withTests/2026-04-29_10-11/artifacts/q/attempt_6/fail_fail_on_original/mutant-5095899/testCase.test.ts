import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle window and self correctly', () => {
        // Set the global window and self
        (global as any).window = { Q: undefined };
        (global as any).self = undefined;

        // Call the Q function
        Q();

        // Check if the correct object was used
        expect((global as any).window.Q).toBeDefined();
    });
});