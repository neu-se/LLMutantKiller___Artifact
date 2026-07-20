import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not throw an error when window is undefined but self is defined', () => {
        // Set up the global variables
        const originalWindow = global.window;
        const originalSelf = global.self;
        global.window = undefined;
        global.self = {};

        // The function should not throw an error
        expect(() => {
            Q();
        }).not.toThrowError();

        // Restore the original global variables
        global.window = originalWindow;
        global.self = originalSelf;
    });
});