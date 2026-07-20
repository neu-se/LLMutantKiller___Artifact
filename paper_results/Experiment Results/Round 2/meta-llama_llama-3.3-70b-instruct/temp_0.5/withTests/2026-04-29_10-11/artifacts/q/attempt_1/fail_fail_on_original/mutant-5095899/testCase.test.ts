import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle window and self correctly', () => {
        // Create a mock window and self object
        const windowMock = {};
        const selfMock = {};

        // Set up the spies
        const windowSpy = jest.spyOn(global, 'window', 'get').mockReturnValue(windowMock);
        const selfSpy = jest.spyOn(global, 'self', 'get').mockReturnValue(selfMock);

        // Call the Q function
        Q();

        // Check if the correct object was used
        expect(windowMock.Q).toBeDefined();
        expect(selfMock.Q).not.toBeDefined();

        // Restore the original values
        windowSpy.mockRestore();
        selfSpy.mockRestore();
    });
});