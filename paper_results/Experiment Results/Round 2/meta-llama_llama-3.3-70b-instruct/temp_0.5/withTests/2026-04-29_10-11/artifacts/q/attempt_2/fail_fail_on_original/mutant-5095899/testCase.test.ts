import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle window and self correctly', () => {
        // Create a mock window and self object
        const windowMock = { Q: undefined };
        const selfMock = { Q: undefined };

        // Set the global window and self
        (global as any).window = windowMock;
        (global as any).self = selfMock;

        // Call the Q function
        Q();

        // Check if the correct object was used
        expect(windowMock.Q).toBeDefined();
        expect(selfMock.Q).not.toBeDefined();
    });
});