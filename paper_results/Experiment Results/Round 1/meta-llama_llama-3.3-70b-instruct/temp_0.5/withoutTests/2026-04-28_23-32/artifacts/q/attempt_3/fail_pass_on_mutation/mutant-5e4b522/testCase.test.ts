import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not throw an error when window is defined', () => {
        // Set up the global variables
        const originalWindow = global.window;
        global.window = {};

        // The function should not throw an error
        expect(() => {
            Q();
        }).not.toThrowError();

        // Restore the original global variables
        global.window = originalWindow;
    });
});